import { DEGeneratorService, Match } from './de-generator.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-de-bracket',
  templateUrl: './de-bracket.component.html',
  styleUrls: ['./de-bracket.component.scss']
})
export class DEBracketComponent implements OnInit {
  @ViewChild('container') container;
  matches:Match[];
  players:any[] = [];
  rounds: Array<any> = [];
  gameName:string = "NÉVTELEN";

  loserMatches: Match[];
  loserRounds: Array<any> = [];
  constructor(private bracket: DEGeneratorService) {}
  ngOnInit(): void {
    this.bracket.generated.subscribe(()=>{
      this.loadItems(this.bracket.GeneratedGames)
      this.loadLosers(this.bracket.GeneratedLosers)
      console.log(this.matches);
      console.log(this.loserMatches);
    })
    this.emptyArrays()
    this.bracket.startGenerating('example')
  }
  emptyArrays(){
    this.matches = []
    this.players = [];
    this.rounds = []
    this.loserMatches = [];
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
    for (let i = 0; i < 7; i++) {
      let newRound = newMatches.filter(el => { return el.Round == (i + 1) });
      if (newRound.length > 0) {
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
  loadLosers(newMatches: Match[]){
    this.loserMatches = newMatches;
    for (let i = 0; i < 7; i++) {
      let newRound = newMatches.filter(el => { return el.Round == (i + 1) });
      if (newRound.length > 0) {
        this.loserRounds.push(newRound)
      }
    }
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
    });
  }
}
