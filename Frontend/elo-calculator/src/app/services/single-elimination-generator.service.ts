import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingleEliminationGeneratorService {
  constructor() {
    this.generateMatches()
    console.log(this.GeneratedGames);
  }
  GeneratedGames:Object[] = [];

  generateMatches() {
    let exampleTeams:string[] = [];
    for (let i = 0; i < 64; i++) {
      exampleTeams.push(`${i + 1}. Játékos`);
    }

    let players = 64;
    let closestBase = this.getClosest(players);
    let Elonyerok = closestBase - players;

    let Meccsek_Száma = closestBase / 2;
    let teamNumber = 0;;
    let matchID = 0;
    let games:Object[] = [];
    let RoundNumber = 1;
    //ELŐNYERŐK
    for (let i = 0; i < Elonyerok; i++) {
      let newGame = {};
      newGame['Meccs_id'] = matchID;
      matchID++;
      newGame['bye'] = true;

      let teams: string[] = [];
      teams.push(exampleTeams[teamNumber]);
      teamNumber += 1;;
      newGame['Csapatok'] = teams;
      newGame['Round'] = RoundNumber;
      newGame['Gyoztes'] = teams[0];
      games.push(newGame);
    }
    //MARADÉK JÁTSZÓK
    for (let i = 0; i < Meccsek_Száma - Elonyerok; i++) {
      let newGame = {};
      newGame['Meccs_id'] = matchID;
      matchID++;
      newGame['bye'] = false;
      let teams: string[] = [];
      teams.push(exampleTeams[teamNumber]);
      teams.push(exampleTeams[teamNumber + 1]);
      let WinnerID = this.getRandomInt(2);
      newGame['Gyoztes'] = teams[WinnerID];
      teamNumber += 2;
      newGame['Csapatok'] = teams;
      newGame['Round'] = RoundNumber;
      games.push(newGame);
    }

    while (Meccsek_Száma != 1) {
      Meccsek_Száma = Meccsek_Száma / 2;
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
        let WinnerID = this.getRandomInt(2);
        let newGame = {};
        newGame['Gyoztes'] = teams[WinnerID];
        newGame['Csapatok'] = teams;
        newGame['Round'] = RoundNumber;
        newGame['bye'] = false;
        newGame['Meccs_id'] = matchID;
        matchID++;
        games.push(newGame);
      }
    }
    this.GeneratedGames = games;
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  getClosest(players) {
    let knownBrackets = [2, 4, 8, 16, 32, 64, 128]
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
