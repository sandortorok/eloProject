import { SESaveModal } from './se-save-modal/se-save-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SEModal } from './se-modal/se-modal.component';
import { SEGeneratorService, Match } from './se-generator.service';
import { SELoadModal } from './se-load-modal/se-load-modal.component';
import { SENewModal } from './se-new-modal/se-new-modal.component';

@Component({
  selector: 'app-se-bracket',
  templateUrl: './se-bracket.component.html',
  styleUrls: ['./se-bracket.component.scss']
})
export class SEBracketComponent implements OnInit {
  @ViewChild('container') container;
  matches:Match[];
  players:any[] = [];
  playerElements: any[] = []
  rounds: Array<any> = [];
  rounds2: Array<any> = [];
  semi1: any = {};
  semi2: any = {};
  final: any = {};
  gameName:string = "NÉVTELEN";


  team32 = false;
  constructor(private bracket: SEGeneratorService, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.bracket.generated.subscribe(()=>{
      this.loadItems(this.bracket.GeneratedGames)
    })
  }


  onTeamClick(event) {
    const target = event.target as HTMLLIElement
    const player1 = target.parentElement?.firstChild?.firstChild?.textContent?.trim()
    const player2 = target.parentElement?.lastChild?.firstChild?.textContent?.trim()
    if(player1 == "" || player2 == "") return;
    const modalRef = this.modalService.open(SEModal, { centered: true });
    modalRef.componentInstance.player1 = player1;
    modalRef.componentInstance.player2 = player2;
    modalRef.componentInstance.updateEvent.subscribe(outcomeObj=>{
      if(outcomeObj.winner.trim() == "") return
      if(outcomeObj.player1.trim() == "") return
      if(outcomeObj.player2.trim() == "") return

      let currentMatch;
      this.matches.forEach(m => {
        if(m.Csapatok![0] == outcomeObj.player1 && m.Csapatok![1] == outcomeObj.player2){
          currentMatch = m;
        }
      });
      currentMatch.Gyoztes = outcomeObj.winner;
      const nextMatch = this.matches[currentMatch.nextRoundID];
      nextMatch.Csapatok![currentMatch.bottom] = currentMatch.Gyoztes;
      target?.parentElement?.classList.remove('current');
      setTimeout(()=>{ this.giveHoverEffect() }, 10)
    })
  }
  onSave(){
    const modalRef = this.modalService.open(SESaveModal, { centered: true });
    modalRef.componentInstance.matches = this.matches;
    if(this.gameName != 'NÉVTELEN') modalRef.componentInstance.IN_gameID = this.gameName;
  }
  onLoad(){
    const modalRef = this.modalService.open(SELoadModal, { centered: true });
    modalRef.componentInstance.matches = this.matches;
    modalRef.componentInstance.loadEvent.subscribe((loadData)=>{
      this.gameName = loadData.name
      this.matches = []
      //kell idő amíg felfogja hogy a newMatches nem üres.......
      setTimeout(() => {
        this.loadItems(loadData.matches)
      }, 1000);
      //meg kell várni míg renderel a view
    })
  }
  onNewBracket(){
    const modalRef = this.modalService.open(SENewModal, { centered: true });
    modalRef.componentInstance.generateEvent.subscribe((players)=>{
      this.matches = []
      this.bracket.startGenerating('withNames', players=players)
    })
    // this.emptyArrays()
    // this.bracket.startGenerating('example')
  }
  emptyArrays(){
    this.matches = []
    this.players = [];
    this.playerElements = []
    this.rounds = []
    this.rounds2 = []
  }
  loadItems(newMatches: Match[]){
    this.emptyArrays()
    this.matches = newMatches
    newMatches.forEach(match=>{
      if(!this.players.includes(match.Csapatok![0]) && match.Csapatok![0] != ""){
        this.players.push(match.Csapatok![0])
      }
      if(!this.players.includes(match.Csapatok![1]) && match.Csapatok![1] != ""){
        this.players.push(match.Csapatok![1])
      }
    })
    if (newMatches.length > 30) {
      this.team32 = true;
    }
    else {
      this.team32 = false;
    }
    for (let i = 0; i < 7; i++) {
      let newRound = newMatches.filter(el => { return el.Round == (i + 1) });
      if (newRound.length == 2 && this.team32) {
        this.semi1 = newRound[0]
        this.semi2 = newRound[1]
      }
      else if (newRound.length == 1 && this.team32) {
        this.final = newRound[0]
      }
      else if (newRound.length > 0) {
        if (this.team32) {
          let newRound2 = newRound.splice(newRound.length / 2, newRound.length)
          this.rounds2.push(newRound2)
        }
        this.rounds.push(newRound)
      }
    }
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
    this.players.forEach(playerName => {
      let samePlayer: any[] = []
      teamElements.forEach(el => {
        if (el.innerText.split('\n')[0] == playerName) {
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
      this.playerElements.push(samePlayer)
    });
  }
}
