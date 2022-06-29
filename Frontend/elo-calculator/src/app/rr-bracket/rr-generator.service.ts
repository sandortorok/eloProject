import { EventEmitter, Injectable, Output } from '@angular/core';
import { Match } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class RRGeneratorService {
  GeneratedGames:Match[] = [];
  exampleTeams:string[] = []
  @Output() generated = new EventEmitter();
  
  startGenerating(gameType: string = 'example', players?: string[]){
    let players_length = 7;
    if (players == undefined){}
    switch (gameType){
      case 'example':
        this.loadExampleTeams(players_length);
        this.generateMatches(this.exampleTeams);
        setTimeout(() => {
          this.generated.emit();
        }, 1000);
        break;
      case 'withNames':
        this.generateMatches(players);
        setTimeout(() => {
          this.generated.emit();
        }, 1000);
        break;
      default:
        this.loadExampleTeams(players_length);
        this.generateMatches(this.exampleTeams);
        break;
    }
  }
  generateMatches(input){
    this.GeneratedGames = [];
    if(input.length %2 == 1){
      input.push('')
    }
    let p_count = input.length;

    for(let roundNumber = 0; roundNumber < p_count-1; roundNumber++){
      for(let gameNumber = 0; gameNumber < p_count/2; gameNumber++){

        let newGame:Match = {
          Csapatok: [input[gameNumber], input[p_count-1-gameNumber]],
          Round: roundNumber+1,
          nextRoundID: -1,
          Gyoztes: '',
          Meccs_id: roundNumber*p_count/2 + gameNumber,
          bye: false,
          bottom: 0
        }
        if(input[gameNumber] == ''){
          newGame.Gyoztes = input[p_count-1-gameNumber];
          newGame.bye = true;
        }
        if(input[p_count-1-gameNumber] == ''){
          newGame.Gyoztes = input[gameNumber];
          newGame.bye = true;
        }
        this.GeneratedGames.push(newGame);
      }
      input = this.rotateArray(input);
      }
    
  }
  loadExampleTeams(how_many){
    this.exampleTeams = [];
    for (let i = 0; i < how_many; i++) {
      this.exampleTeams.push(`${i + 1}. Játékos`);
    }
  }
  rotateArray(input: any[]){
    let fixedPoint = input[0];
    let otherElements = input.filter(el=>{return el!=fixedPoint})
    otherElements.push(otherElements.shift());
    return [fixedPoint].concat(otherElements);
  }
  constructor() { }
}
