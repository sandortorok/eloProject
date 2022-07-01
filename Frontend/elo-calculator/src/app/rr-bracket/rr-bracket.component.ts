import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadModal } from '../modals/load-modal/load-modal.component';
import { WinModal } from '../modals/win-modal/win-modal.component';
import { NewModal } from '../modals/new-modal/new-modal.component';
import { SaveModal } from '../modals/save-modal/save-modal.component';
import { CacheElement, Match } from '../services/data.service';
import { HttpService } from '../services/http.service';
import { RRGeneratorService } from './rr-generator.service';


export interface playerScore{
  name:string,
  wins:number,
  loses:number,
}
@Component({
  selector: 'app-rr-bracket',
  templateUrl: './rr-bracket.component.html',
  styleUrls: ['./rr-bracket.component.scss']
})
export class RRBracketComponent implements OnInit {

  @ViewChild('container') container;
  matches: Match[];
  gameName:string = "";
  @Input() gameType:string;
  players:playerScore[] = [];
  isOpen = true;

  constructor(private bracket: RRGeneratorService, private modalService: NgbModal, private httpservice: HttpService) { }
  ngOnInit(): void {
    this.loadCache();
    this.sub2Generated();
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
  onTeamClick(event){
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
      this.httpservice.saveRRGame({body: this.matches, name: this.gameName, type:this.gameType}).subscribe({})
      this.saveCache();
      this.loadPlayerStats();
      this.giveEffects();
    })
  }
  loadPlayerStats(){
    this.players = [];
    let playerNames:string[] = []
    this.matches.forEach(m=>{
      if(m.Csapatok[0]!= "" && !playerNames.includes(m.Csapatok[0])){
        playerNames.push(m.Csapatok[0])
      }
      if(m.Csapatok[1]!= "" && !playerNames.includes(m.Csapatok[1])){
        playerNames.push(m.Csapatok[1])
      }
    })
    playerNames.forEach(player => {
      let newPlayerScore:playerScore = {name: player,wins: 0,loses: 0}
      this.matches.forEach(m=>{
        if(m.bye != true && m.Gyoztes!="" && m.Csapatok.includes(player)){
          if(m.Gyoztes == player){
            newPlayerScore.wins+=1;
          }
          else {
            newPlayerScore.loses+=1;
          }
        }
      })
      this.players.push(newPlayerScore);
    });
  }
  saveCache(){
    this.httpservice.saveCache({gameName: this.gameName, bracketType:'round-robin', gameType:this.gameType}).subscribe({})
  }
  loadCache(){
    this.httpservice.getCacheFromGame(this.gameType).subscribe(res=>{
      let myarray:Array<CacheElement> = Object.values(res);
      if(myarray.length <= 0) return;
      myarray.forEach(cacheEl=>{
        if(cacheEl.bracketType == 'round-robin'){
          this.gameName = cacheEl.gameName;
        }
      })
      if(this.gameName == "") return;
      this.matches = [];
      this.httpservice.getRRMatch(this.gameName).subscribe(data=>{
        this.loadMatchesFromDataObject(data);
        this.loadPlayerStats();
        this.giveEffects();
      })
      
    })
  }
  loadMatchesFromDataObject(data){
    let myarray = Object.values(data);
    myarray.forEach((match:any)=>{
      let newMatch:Match = {
        Csapatok: [match.player1, match.player2], Gyoztes: match.winner, bye: match.bye, Meccs_id: match.match_ID, Round: match.round,
        nextRoundID: -1,
        bottom: 0
      };
      this.matches.push(newMatch);
    })
  }
  sub2Generated(){
    this.bracket.generated.subscribe(()=>{
      if(this.isOpen){
        this.matches = [];
        this.matches = this.bracket.GeneratedGames
        this.gameName = Math.random().toString(36).slice(2, 7);
        this.httpservice.saveRRGame({body: this.matches, name: this.gameName, type: this.gameType}).subscribe({})
        this.saveCache();
        this.loadPlayerStats();
        this.giveEffects();
        console.log(this.matches);
      }
    })
  }
  onNewBracket(){
    const modalRef = this.modalService.open(NewModal, { centered: true });
    modalRef.componentInstance.generateEvent.subscribe((players)=>{
      this.matches = []
      this.bracket.startGenerating('withNames', players=players)
    })
  }
  onLoad(){
    const modalRef = this.modalService.open(LoadModal, { centered: true });
    modalRef.componentInstance.matches = this.matches;
    modalRef.componentInstance.loadMode = 'round-robin';
    modalRef.componentInstance.gameType = this.gameType;
    modalRef.componentInstance.loadEvent.subscribe((loadData)=>{
      this.gameName = loadData.name
      this.matches = []
      //kell idő amíg felfogja hogy a newMatches nem üres.......
      setTimeout(() => {
        this.matches = []
        this.matches = loadData.matches;
        this.loadPlayerStats();
        this.saveCache();
        this.giveEffects();
      }, 1000);
      //meg kell várni míg renderel a view
    })
  }
  onSave(){
    if(this.matches == undefined) return;
    if(this.matches.length < 1) return;
    const modalRef = this.modalService.open(SaveModal, { centered: true });
    modalRef.componentInstance.matches = this.matches;
    modalRef.componentInstance.saveMode = 'round-robin';
    modalRef.componentInstance.gameType = this.gameType;
    if(this.gameName != '') modalRef.componentInstance.IN_gameID = this.gameName;
    modalRef.componentInstance.saveEvent.subscribe(name=>{
      this.gameName = name;
      this.saveCache();
    })
  }
  onPrintClick(){
    window.print();
  }
  ngOnDestroy(){
    this.isOpen = false;
  }
}
