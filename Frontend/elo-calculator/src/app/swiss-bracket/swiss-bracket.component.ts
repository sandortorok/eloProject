import { HttpService } from 'src/app/services/http.service';
import { CacheElement, Match, swissPlayer, DataService } from './../services/data.service';
import { SwissGeneratorService } from './swiss-generator.service';
import { Component, Input, OnInit, ViewChild, PipeTransform } from '@angular/core';
import { User, UserService } from '../services/user-service.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { NewModal } from '../modals/new-modal/new-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaveModal } from '../modals/save-modal/save-modal.component';
import { LoadModal } from '../modals/load-modal/load-modal.component';
import { WinModal } from '../modals/win-modal/win-modal.component';
import { SortPipe } from '../pipes/sort.pipe';

@Component({
  selector: 'app-swiss-bracket',
  templateUrl: './swiss-bracket.component.html',
  styleUrls: ['./swiss-bracket.component.scss']
})
export class SwissBracketComponent implements OnInit {
  @Input() gameType:string;
  @ViewChild('container') container;
  user:User;
  gameName:string;
  players:swissPlayer[];
  matches:Match[];
  private subscriptions: Array<Subscription> = [];

  constructor(
    private generator:SwissGeneratorService, 
    private userservice:UserService, 
    private httpservice: HttpService, 
    private modalService: NgbModal, 
    private dataservice:DataService,
    private mypipe:SortPipe
    ) { }
  
  ngOnInit(): void {
    this.loadCache();
    this.subscriptions.push(this.sub2UserChange());
    this.subscriptions.push(this.sub2Generated());
    this.subscriptions.push(this.sub2Next());

    this.user = this.userservice.loggedUser;
  }
  myfunc(name:string){
    let a = this.players.filter(p =>{return p.name == name})
    if(a){
      console.log(a[0].points);
      return a[0].points
    }
    return ''
  }
  gridColumns(matches){
    if(matches.filter(m=>{return m.Round > 3}).length > 0){
      return {'grid-template-columns':'1fr 1fr 1fr 1fr'}
    }
    else if(matches.filter(m=>{return m.Round > 2}).length > 0){
      return {'grid-template-columns':'1fr 1fr 1fr 1fr'}
    }
    else if(matches.filter(m=>{return m.Round > 1}).length > 0){
      return {'grid-template-columns':'1fr 1fr 1fr'}
    }
    else if(matches.filter(m=>{return m.Round == 1}).length > 0){
      return {'grid-template-columns':'1fr 1fr'}
    }
    return {'grid-template-columns':'1fr 1fr'}
  }
  giveEffects(){
    this.matches.filter(m=>{return m.Round> 1}).length > 0
    setTimeout(() => {
      if (this.container != undefined){
        this.giveCurrentClass();
        this.giveHoverEffect();
      }
    });
  }
  giveCurrentClass() {
    let matchups = this.container.nativeElement.querySelectorAll('ul');
    matchups.forEach(m => {
      if(m.innerHTML.includes('win') || m.innerHTML.includes('draw')){
        m.classList.remove('current')
      }
      else{
        m.classList.add('current');
      }
    });
  }
  giveHoverEffect() {
    let teamElements = this.container.nativeElement.querySelectorAll('li.team');
    teamElements.forEach(el => {
      if (el.onmouseover != null) el.onmouseover = null;
      if (el.onmouseleave != null) el.onmouseleave = null;
    });
    let players:string[] = []
    this.matches.forEach(match=>{
      let p1 = match.Csapatok[0];
      let p2 = match.Csapatok[1];
      if(p1 != "" && !players.includes(p1)){
        players.push(p1);
      }
      if(p2 != "" && !players.includes(p2)){
        players.push(p2);
      }
    })
    players.forEach(playerName => {
      let samePlayer: any[] = []
      teamElements.forEach(el => {
        if (el.firstChild.textContent.trim() == playerName) {
          samePlayer.push(el)
        }
      });
      samePlayer.forEach(e => {
        e.onmouseover = () => {
          samePlayer.forEach(same => {
            let color = window.getComputedStyle( same,null).getPropertyValue('background-color')
            same.style.border = `1px solid ${color}`;
            same.style.opacity = 1;
            same.style.boxShadow = `0 0 5px ${color}, 0 0 25px ${color}`
          })
        }
        e.onmouseleave = () => {
          samePlayer.forEach(same => {
            same.style.border = "";
            same.style.opacity = "";
            same.style.boxShadow = ""
          })
        }
      })
    });
  }
  onPrintClick(){}
  onNewBracket(){
    const modalRef = this.modalService.open(NewModal, { centered: true });
    modalRef.componentInstance.generateEvent.subscribe((obj)=>{
      this.matches = []
      this.generator.startGenerating('withNames', obj.players)
    })
  }
  onSave(){
    if(this.matches == undefined) return;
    if(this.matches.length < 1) return;
    const modalRef = this.modalService.open(SaveModal, { centered: true });
    modalRef.componentInstance.matches = this.matches;
    modalRef.componentInstance.saveMode = 'swiss';
    modalRef.componentInstance.gameType = this.gameType;
    if(this.gameName != '') modalRef.componentInstance.IN_gameID = this.gameName;
    modalRef.componentInstance.saveEvent.subscribe(name=>{
      this.gameName = name;
      this.saveCache();
    })
  }
  onLoad(){
    const modalRef = this.modalService.open(LoadModal, { centered: true });
    modalRef.componentInstance.matches = this.matches;
    modalRef.componentInstance.loadMode = 'swiss';
    modalRef.componentInstance.gameType = this.gameType;
    modalRef.componentInstance.loadEvent.subscribe((loadData)=>{
      this.gameName = loadData.name
      this.matches = []
      //kell idő amíg felfogja hogy a newMatches nem üres.......
      setTimeout(() => {
        this.matches = []
        this.matches = loadData.matches;
        this.saveCache();
        this.loadPlayerStats();
        this.giveEffects();
      }, 1000);
      //meg kell várni míg renderel a view
    })
  }
  onTeamClick(event){
    if(this.user.privilegeType=='Guest') return;
    let matchID = -1;
    if (event.target.parentNode.tagName == 'LI'){
      matchID = event.target.parentNode.parentNode.id.match(/(\d+)/)![0];
    }
    else{
      matchID = event.target.parentNode.id.match(/(\d+)/)![0];
    }
    let thisMatch = this.matches.filter(m =>{ return m.Meccs_id == matchID})[0];
    if (!thisMatch) return;
    if (thisMatch.Gyoztes != "") return;
    if (thisMatch.Csapatok[0] == "" || thisMatch.Csapatok![1] == "") return;
    const modalRef = this.modalService.open(WinModal, { centered: true });
    modalRef.componentInstance.match = thisMatch;
    modalRef.componentInstance.updateEvent.subscribe((updatedMatch:Match)=>{
      thisMatch = updatedMatch;
      this.httpservice.saveSWGame({body: this.matches, name: this.gameName, type:this.gameType}).subscribe({})
      this.saveCache();
      this.loadPlayerStats();
      this.giveEffects();
    })
  }
  sub2UserChange(){
    return this.userservice.userChanged.subscribe(()=>{
      this.user = this.userservice.loggedUser
    });
  }
  sub2Next(){
    return this.generator.generatedNext.subscribe((newMatches)=>{
      this.matches = newMatches
      this.httpservice.saveSWGame({body: this.matches, name: this.gameName, type: this.gameType}).subscribe({})
      this.saveCache();
      this.loadPlayerStats();
      this.giveEffects();
    })
  }
  sub2Generated(){
    return this.generator.generated.subscribe((newMatches)=>{
        this.gameName = Math.random().toString(36).slice(2, 7);
        this.matches = newMatches;
        this.httpservice.saveSWGame({body: this.matches, name: this.gameName, type: this.gameType}).subscribe({})
        this.saveCache();
        this.loadPlayerStats();
        this.giveEffects();
    })
  }
  saveCache(){
    this.httpservice.saveCache({gameName: this.gameName, bracketType:'swiss', gameType:this.gameType}).subscribe({})
  }
  loadCache(){
    this.httpservice.getCacheFromGame(this.gameType).subscribe(res=>{
      let myarray:Array<CacheElement> = Object.values(res);
      if(myarray.length <= 0) return;
      myarray.forEach(cacheEl=>{
        if(cacheEl.bracketType == 'swiss'){
          this.gameName = cacheEl.gameName;
        }
      })
      if(this.gameName != ""){
        this.matches = [];
        this.httpservice.getSWMatch(this.gameName).subscribe(data=>{
          this.matches = this.dataservice.loadMatchesFromDataObject(data);
          this.loadPlayerStats();
          this.giveEffects();
        })
      }
    })
  }
  loadPlayerStats(){
    let playerScores:swissPlayer[] = [];
    let playerNames:string[] = []
    this.matches.forEach(m=>{
      m.Csapatok.forEach(csapat=>{
        if(csapat != "" && !playerNames.includes(csapat)){
          playerNames.push(csapat)
        }
      })
    })
    playerNames.forEach(pName=>{
      let newPlayerScore:swissPlayer = {name: pName,eloRating: 0,games: 0,gameType: this.gameType,gameName: this.gameName,points: 0, byes:0, blackWhiteHistory:[]}
      this.matches.forEach(m=>{
        if(m.Csapatok.includes(pName)){
          if(m.Gyoztes == 'draw'){
            newPlayerScore.points += 0.5;
          }
          else if(m.Gyoztes == pName){
            newPlayerScore.points+=1;
            if (m.bye == true) {newPlayerScore.byes+=1}
          }
          newPlayerScore.games+=1
          if(this.gameType == "sakk"){
            if(m.bye){
              newPlayerScore.blackWhiteHistory!.unshift('-')
            }
            else if(m.Csapatok[m.white!] == pName){
              newPlayerScore.blackWhiteHistory!.unshift('W')
            }
            else{
              newPlayerScore.blackWhiteHistory!.unshift('B')
            }
          }
        }
      })
      playerScores.push(newPlayerScore);
    })
  playerScores = this.mypipe.transform(playerScores, ['points', '!byes']);
  this.players = playerScores
  }
  onGenerateNext(){
    this.generator.generateNextRound(this.matches, this.players);
  }
  ngOnDestroy(){
    this.subscriptions.forEach((sub:Subscription) => {
      sub.unsubscribe();
    });  
  }
}
