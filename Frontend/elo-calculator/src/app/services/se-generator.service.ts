import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SEGeneratorService {
  constructor() {
    this.generateMatches()
  }
  GeneratedGames:Object[] = [];
  players: string[] = [];
  generateMatches() {
    let exampleTeams:string[] = [];
    for (let i = 0; i < 200; i++) {
      exampleTeams.push(`${i + 1}. Játékos`);
    }

    let players = 20;
    let closestBase = this.getClosest(players);
    let Elonyerok = closestBase - players;
    let Meccsek_Száma = closestBase / 2;
    let teamNumber = 0;;
    let matchID = 0;
    let games:Object[] = [];
    let RoundNumber = 1;
    let nextRoundID = Meccsek_Száma;
    let matchesAdded = 0; //Hány meccset adtunk eddig hozzá a kövi nextRoundID-hez
    //ELŐNYERŐK
    for (let i = 0; i < Elonyerok; i++) {
      let newGame = {};
      
      let teams: string[] = [];
      teams.push(exampleTeams[teamNumber]);
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
      let newGame = {};
      let teams: string[] = [];
      teams.push(exampleTeams[teamNumber]);
      teams.push(exampleTeams[teamNumber + 1]);
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
        let newGame = {};
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
    this.GeneratedGames = games;
    for (let i = 0; i < teamNumber; i++){
      this.players.push(exampleTeams[i])
    }
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
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
}
