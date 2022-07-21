import { Match, } from '../services/data.service';
import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SEGeneratorService {
  constructor() {
  }
  
  GeneratedGames:Match[] = [];
  exampleTeams:string[] = []
  @Output() generated = new EventEmitter();

  startGenerating(gameType: string = 'example', players?: string[]){
    let players_length = 20;
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
        setTimeout(() => {
          this.generated.emit();
        }, 1000);
        break;
    }
    return this.GeneratedGames
  }

  generateMatches(input, isTeam?: boolean) {
    this.GeneratedGames = []
    let players = input.length;
    let closestBase = this.getClosest(players);
    let Elonyerok = closestBase - players;
    let Meccsek_Száma = closestBase / 2;
    let teamNumber = 0;
    let matchID = 0;
    let games:Match[] = [];
    let RoundNumber = 1;
    let nextRoundID = Meccsek_Száma;
    let matchesAdded = 0; //Hány meccset adtunk eddig hozzá a kövi nextRoundID-hez
    //ELŐNYERŐK
    for (let i = 0; i < Elonyerok; i++) {
      let newGame:Match = {Csapatok: [],Round: 0,nextRoundID: 0,Gyoztes: '',Meccs_id: 0,bye: false,bottom: 0,score0:null,score1:null,thirdPlace:false};
      let teams: string[] = [];
      teams.push(input[teamNumber]);
      teams.push("");
      teamNumber += 1;
      newGame['Meccs_id'] = matchID;
      matchID++;
      if(matchesAdded != 2){
        newGame['nextRoundID'] = nextRoundID;
        matchesAdded++;
      }
      else{
        nextRoundID++;
        newGame['nextRoundID'] = nextRoundID;
        matchesAdded = 1;
      }
      newGame['bottom'] = matchesAdded-1;
      newGame['score0'] = 1;
      newGame['score1'] = null;
      newGame['Csapatok'] = teams;
      newGame['Round'] = RoundNumber;
      newGame['Gyoztes'] = teams[0];
      newGame['bye'] = true;
      games.push(newGame);
    }
    //MARADÉK JÁTSZÓK
    for (let i = 0; i < Meccsek_Száma - Elonyerok; i++) {
      let newGame:Match = {Csapatok: [],Round: 0,nextRoundID: 0,Gyoztes: '',Meccs_id: 0,bye: false,bottom: 0,score0: null,score1: null, thirdPlace:false};
      let teams: string[] = [];
      teams.push(input[teamNumber]);
      teams.push(input[teamNumber + 1]);
      teamNumber += 2;
      newGame['Meccs_id'] = matchID;
      matchID++;
      if(matchesAdded != 2){
        newGame['nextRoundID'] = nextRoundID;
        matchesAdded++;
      }
      else{
        nextRoundID++;
        newGame['nextRoundID'] = nextRoundID;
        matchesAdded = 1;
      }
      newGame['bottom'] = matchesAdded-1;
      newGame['Gyoztes'] = "";
      newGame['score0'] = null;
      newGame['score1'] = null;
      newGame['Csapatok'] = teams;
      newGame['Round'] = RoundNumber;
      newGame['bye'] = false;
      games.push(newGame);
    }

    while (Meccsek_Száma != 1) {
      Meccsek_Száma = Meccsek_Száma / 2;
      nextRoundID = nextRoundID+1;
      if (Meccsek_Száma == 1){
        nextRoundID = -1;
      }
      matchesAdded = 0; //Hány meccset adtunk eddig hozzá a kövi nextRoundID-hez
      let nextRound:Object[] = [];
      nextRound = games.filter(el => {
        return el['Round'] == RoundNumber;
      })
      RoundNumber++;
      for (let i = 0; i < Meccsek_Száma; i += 1) {
        let meccs1_ID = i * 2;
        let meccs2_ID = meccs1_ID + 1;
        let meccs1 = nextRound[meccs1_ID];
        let meccs2 = nextRound[meccs2_ID];
        let teams: string[] = [];
        teams.push(meccs1['Gyoztes']);
        teams.push(meccs2['Gyoztes']);
        let newGame:Match = {Csapatok: [],Round: 0,nextRoundID: 0,Gyoztes: '',Meccs_id: 0,bye: false,bottom: 0,score0: null,score1: null, thirdPlace:false};
        newGame['Meccs_id'] = matchID;
        if(matchesAdded != 2){
          newGame['nextRoundID'] = nextRoundID;
          matchesAdded++;
        }
        else{
          nextRoundID++;
          newGame['nextRoundID'] = nextRoundID;
          matchesAdded = 1;
        }
        newGame['bottom'] = matchesAdded-1;
        newGame['Gyoztes'] = "";
        newGame['score0'] = null;
        newGame['score1'] = null;
        newGame['Csapatok'] = teams;
        newGame['Round'] = RoundNumber;
        newGame['bye'] = false;
        matchID++;
        games.push(newGame);
      }
    }
    games.push({Csapatok: ['', ''],Round: RoundNumber+1,nextRoundID: -1,Gyoztes: '',Meccs_id: matchID++,bye: false,bottom: 0,score0: null,score1: null, thirdPlace:true});
    this.GeneratedGames = games;
    console.log(games);
  }
  getClosest(players) {
    const knownBrackets = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
    for (let i = 0; i < knownBrackets.length; i++) {
      if (players == knownBrackets[i]) {
        return knownBrackets[i]
      }
      if (players < knownBrackets[i]) {
        return knownBrackets[i];
      }
    }
    return -1;
  }
  loadExampleTeams(how_many){
    this.exampleTeams = [];
    for (let i = 0; i < how_many; i++) {
      this.exampleTeams.push(`${i + 1}. Játékos`);
    }
  }
}
