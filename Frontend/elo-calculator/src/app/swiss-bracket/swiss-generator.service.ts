import { EventEmitter, Injectable, Output } from '@angular/core';
import { Match, eloPlayer } from '../services/data.service';


@Injectable({
  providedIn: 'root'
})
export class SwissGeneratorService {
  GeneratedGames:Match[] = [];
  exampleTeams:string[] = []
  @Output() generated = new EventEmitter<Match[]>();


  constructor() { }
  startGenerating(gameType: string = 'example', players?: string[]){
    let players_length = 7;
    if (players == undefined){}
    switch (gameType){
      case 'example':
        this.loadExampleTeams(players_length);
        this.generateFirstRound(this.exampleTeams);
        break;
      case 'withNames':
        this.generateFirstRound(players!);
        break;
      default:
        this.loadExampleTeams(players_length);
        this.generateFirstRound(this.exampleTeams);
        break;
    }
  }
  generateFirstRound(players:string[]){
    this.GeneratedGames = [];
    if(players.length %2 == 1){
      players.push('')
    }
    let p_count = players.length;
    for(let gameNumber = 0; gameNumber < p_count/2; gameNumber++){
      let newGame:Match = {
        Csapatok: [players[gameNumber], players[p_count-1-gameNumber]],
        Round: 1,
        nextRoundID: -1,
        Gyoztes: '',
        Meccs_id: gameNumber,
        bye: false,
        bottom: 0,
        score0:null,
        score1:null
      }
      if(players[gameNumber] == ''){
        newGame.Gyoztes = players[p_count-1-gameNumber];
        newGame.bye = true;
      }
      if(players[p_count-1-gameNumber] == ''){
        newGame.Gyoztes = players[gameNumber];
        newGame.bye = true;
      }
      this.GeneratedGames.push(newGame);
    }
    console.log('emit');
    setTimeout(() => {
      this.generated.emit(this.GeneratedGames)
    }, 1000);
  }
  generateNextRound(previousMatches:Match[]){
    
  }
  loadExampleTeams(how_many:number){
    this.exampleTeams = [];
    for (let i = 0; i < how_many; i++) {
      this.exampleTeams.push(`${i + 1}. Játékos`);
    }
  }
}
