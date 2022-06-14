import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SEModal } from './se-modal/se-modal.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { SEGeneratorService } from './se-generator.service';

@Component({
  selector: 'app-se-bracket',
  templateUrl: './se-bracket.component.html',
  styleUrls: ['./se-bracket.component.scss']
})
export class SEBracketComponent implements OnInit {
  @ViewChild('container') container;
  matches:any[] = [];
  players:any[] = [];
  playerElements: any[] = []
  rounds: Array<any> = [];
  rounds2: Array<any> = [];
  semi1: any = {};
  semi2: any = {};
  final: any = {};

  team32 = false;
  constructor(private bracket: SEGeneratorService, private modalService: NgbModal) {
    
  }
  ngOnInit(): void {
    this.bracket.generated.subscribe(()=>{
      this.matches = this.bracket.GeneratedGames;
      this.players = this.bracket.players;
      if (this.matches.length > 30) {
        this.team32 = true;
      }
      for (let i = 0; i < 7; i++) {
        let newRound = this.matches.filter(el => { return el.Round == (i + 1) });
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
      //meg kell várni míg renderel a view
      setTimeout(() => {
        if (this.container != undefined){
          this.giveHoverEffect();
          this.giveCurrentClass();
        }
      });
    })
    this.bracket.startGenerating('example')
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
            same.style.border = "1px solid #000";
            same.style.opacity = 1;
          })
        }
        e.onmouseleave = () => {
          samePlayer.forEach(same => {
            same.style.border = "";
            same.style.opacity = "";
          })
        }
      })
      this.playerElements.push(samePlayer)
    });
  }

  onTeamClick(event) {
    const target = event.target as HTMLLIElement
    const modalRef = this.modalService.open(SEModal);
    const player1 = target.parentElement?.firstChild?.firstChild?.textContent?.trim()
    const player2 = target.parentElement?.lastChild?.firstChild?.textContent?.trim()
    modalRef.componentInstance.player1 = player1;
    modalRef.componentInstance.player2 = player2;
    modalRef.componentInstance.updateEvent.subscribe(outcomeObj=>{
      if(outcomeObj.winner.trim() == "") return
      if(outcomeObj.player1.trim() == "") return
      if(outcomeObj.player2.trim() == "") return

      let currentMatch;
      this.matches.forEach(m => {
        if(m.Csapatok[0] == outcomeObj.player1 && m.Csapatok[1] == outcomeObj.player2){
          currentMatch = m;
        }
      });
      currentMatch.Gyoztes = outcomeObj.winner;
      const nextMatch = this.matches[currentMatch.nextRoundID];
      nextMatch.Csapatok[currentMatch.bottom] = currentMatch.Gyoztes;
      target?.parentElement?.classList.remove('current');
      setTimeout(()=>{ this.giveHoverEffect() }, 10)
    })
  }
}
