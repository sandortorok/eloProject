import { DataService } from './../services/data.service';
import { InfoModal } from './../modals/info-modal/info-modal.component';
import { User, UserService } from './../services/user-service.service';
import { WinModal } from '../modals/win-modal/win-modal.component';
import { SaveModal } from '../modals/save-modal/save-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DEGeneratorService } from './de-generator.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NewModal } from '../modals/new-modal/new-modal.component';
import { LoadModal } from '../modals/load-modal/load-modal.component';
import { HttpService } from '../services/http.service';
import { CacheElement, Match } from '../services/data.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-de-bracket',
  templateUrl: './de-bracket.component.html',
  styleUrls: ['./de-bracket.component.scss']
})
export class DEBracketComponent implements OnInit {
  @ViewChild('container') container;
  matches:Match[];
  gameName:string = "";
  user:User;
  @Input() gameType:string;
  desktopView:boolean = false;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private bracket: DEGeneratorService, 
    private modalService: NgbModal, 
    private httpservice: HttpService, 
    private dataservice: DataService,
    private userservice: UserService) {}

  ngOnInit(): void {
    this.loadCache();
    this.user = this.userservice.loggedUser;
    this.subscriptions.push(this.sub2UserChange());
    this.subscriptions.push(this.sub2Generated());
  }
  giveEffects(){
    setTimeout(() => {
      if (this.container != undefined){
        this.giveHoverEffect();
        this.giveCurrentClass();
      }
    });
  }
  giveCurrentClass() {
    let matchups = this.container.nativeElement.querySelectorAll('ul');
    matchups.forEach(m => {
      if(!m.innerHTML.includes('win') && !m.innerHTML.includes('bye')){
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
    this.addHoverToPlayers(players, teamElements);
  }
  addHoverToPlayers(players, teamElements){
    players.forEach((playerName:string) => {
      let samePlayer: any[] = []
      teamElements.forEach(el => {
        if (el.firstChild.textContent.trim() == playerName) {
          samePlayer.push(el)
        }
      });
      let match;
      if (playerName.includes('Vesztese') || playerName.includes('Győztese')){
        if(playerName.match(/(\d+)/)){
          let id = parseInt(playerName.match(/(\d+)/)![0]); //STRINGBEN LÉVŐ SZÁM (MATCHID)
          match = this.container.nativeElement.querySelector(`[id='match ${id}']`)
        }
      }
      samePlayer.forEach(e => {
        e.onmouseover = () => {
          samePlayer.forEach(same => {
            let color = window.getComputedStyle( same,null).getPropertyValue('background-color')
            same.style.border = `1px solid ${color}`;
            same.style.opacity = 1;
            same.style.boxShadow = `0 0 5px ${color}, 0 0 25px ${color}`
          })
          if (match){
            match.style.opacity = 1;
            match.style.boxShadow = "0 0 5px rgb(71, 228, 9), 0 0 25px rgb(71, 228, 9)"
          }
        }
        e.onmouseleave = () => {
          samePlayer.forEach(same => {
            same.style.border = "";
            same.style.opacity = "";
            same.style.boxShadow = ""
          })
          if (match){
            match.style.border = "";
            match.style.opacity = "";
            match.style.boxShadow = ""
          }
        }
      })
    });
  }
  onNewBracket(){
    const modalRef = this.modalService.open(NewModal, { centered: true });
    modalRef.componentInstance.generateEvent.subscribe((obj)=>{
      this.matches = [];
      this.bracket.startGenerating('withNames', obj.players)
    })
  }
  onSave(){
    if(this.matches == undefined) return;
    if(this.matches.length < 1) return;
    const modalRef = this.modalService.open(SaveModal, { centered: true });
    modalRef.componentInstance.matches = this.matches;
    modalRef.componentInstance.saveMode = 'double-elimination';
    modalRef.componentInstance.gameType = this.gameType;
    if(this.gameName != '') modalRef.componentInstance.IN_gameID = this.gameName;
    modalRef.componentInstance.saveEvent.subscribe(name =>{
      this.gameName = name;
      this.saveCache();
    })
  }
  onLoad(){
    const modalRef = this.modalService.open(LoadModal, { centered: true });
    modalRef.componentInstance.matches = this.matches;
    modalRef.componentInstance.loadMode = 'double-elimination';
    modalRef.componentInstance.gameType = this.gameType;
    modalRef.componentInstance.loadEvent.subscribe((loadData)=>{
      this.gameName = loadData.name
      this.matches = [];
      //kell idő amíg felfogja hogy a newMatches nem üres.......
      setTimeout(() => {
        this.matches = loadData.matches
        this.giveEffects();
      }, 1000);
      //meg kell várni míg renderel a view
    })
  }
  onTeamClick(event){
    event.target.parentNode.id;
    let matchID = event.target.parentNode.id.match(/(\d+)/)![0];
    let thisMatch = this.matches.filter(m =>{ return m.Meccs_id == matchID})[0];
    if (!thisMatch) return;
    if (thisMatch.Gyoztes != "") return;
    if (thisMatch.Csapatok[0] == "" || thisMatch.Csapatok![1] == "") return;
    if (thisMatch.Csapatok[0].includes('Győztese') || thisMatch.Csapatok[1].includes('Győztese')) return;
    if (thisMatch.Csapatok[0].includes('Vesztese') || thisMatch.Csapatok[1].includes('Vesztese')) return;
    if(this.user.privilegeType=='Guest'){
      this.modalService.open(InfoModal, { centered: true });
      return;
    };
    const modalRef = this.modalService.open(WinModal, { centered: true });
    modalRef.componentInstance.match = thisMatch;
    modalRef.componentInstance.updateEvent.subscribe((updatedMatch:Match)=>{
      if(updatedMatch.Gyoztes == 'draw') return;
      thisMatch = updatedMatch;
      

      let vesztes: string;
      if(thisMatch.Csapatok[0] == thisMatch.Gyoztes){
        vesztes = thisMatch.Csapatok[1];
      }
      else { vesztes = thisMatch.Csapatok[0] }
      this.matches.forEach(match=>{
          if(match.losersFrom  && match.losersFrom[0] == thisMatch.Meccs_id){
            let changedFrom = match.Csapatok[0];
            match.Csapatok[0] = vesztes;
            if(match.Gyoztes == changedFrom){ match.Gyoztes = vesztes }
          }
          if(match.losersFrom  && (match.losersFrom[1] == thisMatch.Meccs_id)){
            let changedFrom = match.Csapatok[1];
            match.Csapatok[1] = vesztes;
            if(match.Gyoztes == changedFrom){ match.Gyoztes = vesztes }
          }
      })
      let nextID = thisMatch.nextRoundID
      let finals = this.matches.filter(m=>{return m.final==true});
      let final1 = finals[0];
      let deleted = false;
      if(thisMatch.Meccs_id == final1.Meccs_id){
        let thisWinner = thisMatch.Gyoztes
        let lostCount = 0;
        this.matches.forEach(m=>{
          if(m.Csapatok.includes(thisWinner) && m.Gyoztes != thisWinner){
            lostCount++;
            console.log('lost', m);
          }
        })
        if(lostCount == 0){
          let newMatches:Match[] = JSON.parse(JSON.stringify(this.matches));
          let popped = newMatches.pop()!;
          this.matches = newMatches;
          deleted = true;
          this.httpservice.deleteDEMatch({gameName: this.gameName, match_ID:popped.Meccs_id}).subscribe(a=>{});
        }
      }
      if (nextID >= 0 && !deleted){
        let nextMatch:Match;
        nextMatch = this.matches.filter(m=>{return m.Meccs_id == nextID})[0]
        let nextTeam = nextMatch.Csapatok[thisMatch.bottom]
        if(nextTeam == "" || nextTeam.includes('Győztese')){
          nextMatch.Csapatok[thisMatch.bottom] = thisMatch.Gyoztes; //Kövi meccs feltöltése
        }
        else{
          nextMatch.Csapatok[1-thisMatch.bottom] = thisMatch.Gyoztes; //Ha már foglalt a hely berakjuk a másikba
        }
      }
      this.saveDEGame();
      this.saveCache();
      this.giveEffects();
    })
  }
  saveCache(){
    this.httpservice.saveCache({gameName: this.gameName, bracketType:'double-elimination', gameType:this.gameType}).subscribe({})
  }
  saveDEGame(){
    this.httpservice.saveDEGame({body: this.matches, name: this.gameName, type:this.gameType}).subscribe({})
  }
  loadCache(){
    this.httpservice.getCacheFromGame(this.gameType).subscribe(res=>{
      let myarray:Array<CacheElement> = Object.values(res);
      if(myarray.length <= 0) return;
      myarray.forEach(cacheEl=>{
        if(cacheEl.bracketType == 'double-elimination'){
          this.gameName = cacheEl.gameName;
        }
      })
      if(this.gameName != ""){
        this.matches = [];
        this.httpservice.getDEMatch(this.gameName).subscribe(data=>{
          console.log(data);
          this.matches = this.dataservice.loadMatchesFromDataObject(data);
          this.giveEffects();
          console.log(this.matches);
        })
      }
    })
  }
  sub2Generated(){
    return this.bracket.generated.subscribe(()=>{
        this.matches = [];
        this.matches = this.bracket.GeneratedGames
        this.gameName = Math.random().toString(36).slice(2, 7);
        console.log(this.matches);
        this.httpservice.saveDEGame({body: this.matches, name: this.gameName, type: this.gameType}).subscribe({})
        this.saveCache();
        this.giveEffects();
    })
  }
  sub2UserChange(){
    return this.userservice.userChanged.subscribe(()=>{
      this.user = this.userservice.loggedUser
    });
  }
  viewChange(){
    this.desktopView = !this.desktopView;
  }
  onPrintClick(){
    window.print()
  }
  ngOnDestroy(){
    this.subscriptions.forEach((sub:Subscription) => {
      sub.unsubscribe();
    });  
  }
}
