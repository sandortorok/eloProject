import { DataService } from './../services/data.service';
import { User, UserService } from './../services/user-service.service';
import { HttpService } from 'src/app/services/http.service';
import { SaveModal } from '../modals/save-modal/save-modal.component';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WinModal } from '../modals/win-modal/win-modal.component';
import { SEGeneratorService } from './se-generator.service';
import { LoadModal } from '../modals/load-modal/load-modal.component';
import { NewModal } from '../modals/new-modal/new-modal.component';
import { CacheElement, Match } from '../services/data.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-se-bracket',
  templateUrl: './se-bracket.component.html',
  styleUrls: ['./se-bracket.component.scss']
})
export class SEBracketComponent implements OnInit {
  @ViewChild('container') container;
  matches:Match[];
  gameName:string = "";
  user:User;
  @Input() gameType;
  desktopView:boolean = false;

  private subscriptions: Array<Subscription> = [];

  constructor(private bracket: SEGeneratorService, private modalService: NgbModal, private httpservice: HttpService, private userservice: UserService, private dataservice: DataService) {}
  ngOnInit(): void {
    this.loadCache();
    this.user = this.userservice.loggedUser;
    this.subscriptions.push(this.sub2UserChange());
    this.subscriptions.push(this.sub2Generated());
  }
  onTeamClick(event) {
    if(this.user.privilegeType=='Guest') return;
    let matchID = event.target.parentNode.id.match(/(\d+)/)![0];
    let thisMatch = this.matches.filter(m =>{ return m.Meccs_id == matchID})[0];
    if (!thisMatch) return;
    if(thisMatch.Gyoztes != "") return;
    if (thisMatch.Csapatok[0] == "" || thisMatch.Csapatok![1] == "") return;
    const modalRef = this.modalService.open(WinModal, { centered: true });
    modalRef.componentInstance.match = thisMatch;
    modalRef.componentInstance.updateEvent.subscribe((updatedMatch:Match)=>{
      thisMatch = updatedMatch;
      let nextID = thisMatch.nextRoundID
      if(nextID >= 0){
        let nextMatch:Match = this.matches.filter(m=>{return m.Meccs_id == nextID})[0]
        nextMatch.Csapatok[thisMatch.bottom] = thisMatch.Gyoztes;
      }
      this.httpservice.saveSEGame({body: this.matches, name: this.gameName, type:this.gameType}).subscribe({})
      this.saveCache();
      this.giveEffects();
    })
  }
  onSave(){
    if(this.matches == undefined) return;
    if(this.matches.length < 1) return;
    const modalRef = this.modalService.open(SaveModal, { centered: true });
    modalRef.componentInstance.matches = this.matches;
    modalRef.componentInstance.saveMode = 'single-elimination';
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
    modalRef.componentInstance.gameType = this.gameType;
    modalRef.componentInstance.loadMode = 'single-elimination';
    modalRef.componentInstance.loadEvent.subscribe((loadData)=>{
      this.gameName = loadData.name
      this.matches = []
      //kell idő amíg felfogja hogy a newMatches nem üres.......
      setTimeout(() => {
        this.matches = []
        this.matches = loadData.matches;
        this.saveCache();
        this.giveEffects();
      }, 1000);
      //meg kell várni míg renderel a view
    })
  }
  onNewBracket(){
    const modalRef = this.modalService.open(NewModal, { centered: true });
    modalRef.componentInstance.generateEvent.subscribe((obj)=>{
      this.matches = []
      this.bracket.startGenerating('withNames', obj.players)
    })
  }
  giveCurrentClass() {
    let matchups = this.container.nativeElement.querySelectorAll('ul');
    matchups.forEach(m => {
      if(!m.innerHTML.includes('win')){
        m.classList.add('current');
      }
      else{
        m.classList.remove('current')
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
            same.style.border = "1px solid rgb(71, 228, 9)";
            same.style.opacity = 1;
            same.style.boxShadow = "0 0 5px rgb(71, 228, 9), 0 0 25px rgb(71, 228, 9)"
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
  giveEffects(){
    setTimeout(() => {
      if (this.container != undefined){
        this.giveHoverEffect();
        this.giveCurrentClass();
      }
    });
  }

  saveCache(){
    this.httpservice.saveCache({gameName: this.gameName, bracketType:'single-elimination', gameType:this.gameType}).subscribe({})
  }
  loadCache(){
    this.httpservice.getCacheFromGame(this.gameType).subscribe(res=>{
      let myarray:Array<CacheElement> = Object.values(res);
      if(myarray.length <= 0) return;
      myarray.forEach(cacheEl=>{
        if(cacheEl.bracketType == 'single-elimination'){
          this.gameName = cacheEl.gameName;
        }
      })
      if(this.gameName != ""){
        this.matches = [];
        this.httpservice.getSEMatch(this.gameName).subscribe(data=>{
          this.matches = this.dataservice.loadMatchesFromDataObject(data);
          this.giveEffects();
        })
      }
    })
  }
  sub2Generated(){
    return this.bracket.generated.subscribe(()=>{
        this.matches = [];
        this.matches = this.bracket.GeneratedGames
        this.gameName = Math.random().toString(36).slice(2, 7);
        this.httpservice.saveSEGame({body: this.matches, name: this.gameName, type: this.gameType}).subscribe({})
        this.saveCache();
        this.giveEffects();
    })
  }
  sub2UserChange(){
    return this.userservice.userChanged.subscribe(()=>{
      this.user = this.userservice.loggedUser
    });
  }
  onPrintClick(){
    window.print();
  }
  viewChange(){
    this.desktopView = !this.desktopView;
  }
  ngOnDestroy(){
    this.subscriptions.forEach((sub:Subscription) => {
      sub.unsubscribe();
    });  
  }
}
