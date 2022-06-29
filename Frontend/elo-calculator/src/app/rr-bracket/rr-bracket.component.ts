import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SEModal } from '../se-bracket/se-modal/se-modal.component';
import { Match } from '../services/data.service';
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
  gameName:string = "NÉVTELEN";
  @Input() gameType:string;
  players:playerScore[] = [];
  constructor(private bracket: RRGeneratorService, private modalService: NgbModal, private httpservice: HttpService) { }
  ngOnInit(): void {
    this.bracket.startGenerating('example');
    this.bracket.generated.subscribe(()=>{
      this.matches = [];
      this.matches = this.bracket.GeneratedGames;
      this.loadPlayerStats();
      this.giveEffects();
    })
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
    const modalRef = this.modalService.open(SEModal, { centered: true });
    modalRef.componentInstance.match = thisMatch;
    modalRef.componentInstance.updateEvent.subscribe((updatedMatch:Match)=>{
      thisMatch = updatedMatch;
      let nextID = thisMatch.nextRoundID
      if(nextID >= 0){
        let nextMatch:Match = this.matches.filter(m=>{return m.Meccs_id == nextID})[0]
        nextMatch.Csapatok[thisMatch.bottom] = thisMatch.Gyoztes;
      }
      // this.httpservice.saveRRGame({body: this.matches, name: this.gameName, type:this.gameType}).subscribe({})
      // this.saveCache();
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
  onNewBracket(){
  }
  onLoad(){
  }
  onSave(){

  }
  onPrintClick(){
    window.print();
  }

}
