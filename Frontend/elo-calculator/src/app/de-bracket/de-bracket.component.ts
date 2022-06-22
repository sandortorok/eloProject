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
    this.rounds = []
    this.loserMatches = [];
  }
  loadItems(newMatches: Match[]){
    this.emptyArrays()
    this.matches = newMatches
    for (let i = 0; i < 10; i++) {
      let newRound = newMatches.filter(el => { return el.Round == (i + 1) });
      if (newRound.length > 0) {
        this.rounds.push(newRound)
      }
    }
  }
  loadLosers(newMatches: Match[]){
    this.loserMatches = newMatches;
    for (let i = 0; i < 10; i++) {
      let newRound = newMatches.filter(el => { return el.Round == (i + 1) });
      if (newRound.length > 0) {
        this.loserRounds.push(newRound)
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
    let a = this.container.nativeElement.querySelectorAll("[id='match 0']")
    console.log(a);

    teamElements.forEach(el => {
      if (el.onmouseover != null) el.onmouseover = null;
      if (el.onmouseleave != null) el.onmouseleave = null;
    });
    let players:string[] = []
    this.matches.forEach(match=>{
      let p1 = match.Csapatok![0];
      let p2 = match.Csapatok![1];
      if(p1 != "" && !players.includes(p1)){
        players.push(p1);
      }
      if(p2 != "" && !players.includes(p2)){
        players.push(p2);
      }
    })
    this.loserMatches.forEach(match=>{
      let p1 = match.Csapatok![0];
      let p2 = match.Csapatok![1];
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
        if (el.innerText.split('\n')[0] == playerName) {
          samePlayer.push(el)
        }
      });
      let match;
      if (playerName.includes('Loser')){
        let id = parseInt(playerName.match(/(\d+)/)![0]); //STRINGBEN LÉVŐ SZÁM (MATCHID)
        match = this.container.nativeElement.querySelector(`[id='match ${id}']`)
      }
      samePlayer.forEach(e => {
        e.onmouseover = () => {
          samePlayer.forEach(same => {
            same.style.opacity = 1;
            same.style.boxShadow = "0 0 5px rgb(71, 228, 9), 0 0 25px rgb(71, 228, 9)"
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
}
