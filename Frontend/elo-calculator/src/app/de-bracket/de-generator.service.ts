import { DataService, Player, Team } from '../services/data.service';
import { Injectable, Output, EventEmitter } from '@angular/core';

export interface Match{
  Csapatok: string[],
  Round: number,
  nextRoundID: number,
  Gyoztes: string,
  Meccs_id: number,
  bye: boolean,
  bottom: number,
  loser?: boolean;
  final?: boolean;
  score0?: number | null,
  score1?: number | null,
  losersFrom?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class DEGeneratorService {
  constructor(private data: DataService) {
  }
  
  GeneratedGames:Match[] = [];
  exampleTeams:string[] = []
  @Output() generated = new EventEmitter();

  startGenerating(gameType: string = 'example', players?: string[], teams?: Team[]){
    let players_length = 6;
    if (players == undefined){}
    if (teams == undefined){}
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
      case 'volleyBall':
        setTimeout(() => {
          let arr:string[] = [];
          this.data.volleyBallTeams.forEach(team=>{
            arr.push(team.teamName);
          })
          this.generateMatches(arr)
          this.generated.emit();
        }, 1000);
        break;
      case 'chess':
        setTimeout(() => {
          let arr:string[] = [];
          this.data.chessPlayers.forEach(player=>{
            arr.push(player.name);
          })
          this.generateMatches(arr);
          this.generated.emit();
        }, 1000);
        break;
      default:
        this.loadExampleTeams(players_length);
        this.generateMatches(this.exampleTeams);
        break;
    }

  }

  generateMatches(input) {
    this.GeneratedGames = [];
    let games:Match[] = [];
    let players = input.length;
    let closestBase = this.getClosest(players);
    let Elonyerok = closestBase - players;
    let Meccsek_Száma = closestBase;
    let teamNumber = 0;
    let matchID = 0;
    let RoundNumber = 0;
    let nextRoundID = closestBase / 2;
    let matchesAdded;

    while (Meccsek_Száma != 1) {
      let prevRound:Object[] = [];
      if(RoundNumber != 0){
        nextRoundID = nextRoundID+1;
        prevRound = games.filter(el => {
          return el['Round'] == RoundNumber;
        })
      }
      Meccsek_Száma = Meccsek_Száma / 2;
      if (Meccsek_Száma == 1){
        nextRoundID = -1;
      }
      matchesAdded = 0; //Hány meccset adtunk eddig hozzá a kövi nextRoundID-hez
      RoundNumber++;
      for (let i = 0; i < Meccsek_Száma; i++) {
        let newGame:Match = {Meccs_id: matchID, loser: false, bye: false, final:false,
          Gyoztes: "", Round: RoundNumber, score1: null, nextRoundID: nextRoundID, Csapatok: [], bottom: 0}

        let teams: string[] = [];
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
        newGame['score0'] = null;
  
        if (i < Elonyerok && RoundNumber == 1){ //HA ELŐNYERŐ
          newGame['score0'] = 1;
          newGame['bye'] = true;
          teams.push(input[teamNumber]);
          teamNumber += 1;
          teams.push("");
          newGame['Gyoztes'] = teams[0];
        }
        else if(RoundNumber == 1){ //HA NEM ELŐNYERŐ
          teams.push(input[teamNumber]);
          teamNumber += 1;
          teams.push(input[teamNumber]);
          teamNumber += 1;
        }
        else{ //HA NEM AZ ELSŐ KÖR
          let meccs1_ID = i * 2;
          let meccs2_ID = meccs1_ID + 1;
          let meccs1 = prevRound[meccs1_ID];
          let meccs2 = prevRound[meccs2_ID];
          teams.push(meccs1['Gyoztes']);
          teams.push(meccs2['Gyoztes']);
        }
        matchID++;
        newGame['Csapatok'] = teams;
        games.push(newGame);
      }
    }
    this.GeneratedGames = games;
    //LOSER BRACKET
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    let LoserRoundID = 0;
    let loserGames:Match[] = [];
    Meccsek_Száma = closestBase/2/2;
    RoundNumber = 0;
    RoundNumber++;
    matchesAdded = 0;
    nextRoundID = Meccsek_Száma + games.length;
    //ROUND 1
    for(let i = 0; i < Meccsek_Száma; i++){
      let newGame:Match = {Meccs_id: matchID, loser: true, bye: false, final: false,
          Gyoztes: "", Round: RoundNumber, score0: null, score1: null, bottom: 0, nextRoundID: nextRoundID, Csapatok: []}
      nextRoundID++;
      matchID++
      let losersFrom:number[] = [];
      let teams:string[] = []
      if(games[LoserRoundID].bye == true){
          newGame['bye'] = true;
          teams.push("")
          losersFrom.push(-1)
      }
      else{
          teams.push(`Loser of ${LoserRoundID}`)
          losersFrom.push(LoserRoundID);
      }
      LoserRoundID++;
      if(games[LoserRoundID].bye == true){
          newGame['bye'] = true;
          teams.push("");
          losersFrom.push(-1);
      }
      else{
          teams.push(`Loser of ${LoserRoundID}`);
          losersFrom.push(LoserRoundID);
      }
      LoserRoundID++;
      teamNumber += 2;
      newGame['Csapatok'] = teams
      newGame['losersFrom'] = losersFrom;
      if(matchesAdded%2 == 0){ // FELSŐ MECCS
        newGame['bottom'] = 0;
        matchesAdded++; 
      }
      else{ //Alsó meccs
        newGame['bottom'] = 1;
        matchesAdded = 1;
      }
      if(teams[0] == "" && teams[1] != ""){
        newGame["Gyoztes"] = teams[1];
      }
      else if(teams[1] == ""  && teams[0] != ""){
        newGame["Gyoztes"] = teams[0];
      }
      loserGames.push(newGame)
    }

    let oneGameCounter = 0;
    while(Meccsek_Száma >= 1){
      let prevRound:Match[];
      if(RoundNumber%2 == 1){
        LoserRoundID += (Meccsek_Száma-1);//HOGY FORDÍTVA ADJA MOST HOZZÁ
      }
      else{
        LoserRoundID += (Meccsek_Száma+1);//MERT FORDÍTVA ADTUK HOZZÁ
        if(Meccsek_Száma != 1){
          Meccsek_Száma = Meccsek_Száma / 2;
        }
        
      }
      if(Meccsek_Száma == 1){
        oneGameCounter++;
      }
      if(oneGameCounter == 3){
        Meccsek_Száma=0
      }
      prevRound = [];
      prevRound = loserGames.filter(el => {
        return el['Round'] == RoundNumber;
      })
      RoundNumber++;
      matchesAdded = 0;

      for(let i = 0; i < Meccsek_Száma; i++){
        let prevHasWinner = false
        let prevMatches:Match[] = [];
        let prevFullBye = false
        prevRound.forEach(match=>{
          if(match.nextRoundID == matchID && match.Gyoztes!.length > 0){
            prevHasWinner = true;
            prevMatches.push(match);
          }
          else if(match.nextRoundID == matchID && match.Csapatok![0].length == 0 && match.Csapatok![1].length == 0 && RoundNumber == 2){
            prevFullBye = true;
          }
        })
        let newGame:Match = {Meccs_id: matchID, loser: true, bye: false, final: false,
          Gyoztes: "", Round: RoundNumber, score0: null, score1: null, bottom: 0, nextRoundID: nextRoundID, Csapatok:[]}
        matchID++
        let teams:string[] = [];
        let losersFrom:number[] = [];
        if(RoundNumber %2 == 0){
          teams.push(`Loser of ${LoserRoundID}`);
          losersFrom.push(LoserRoundID);
          LoserRoundID--;
        }
        newGame['Gyoztes'] = "";
        if(prevHasWinner){
          prevMatches.forEach(m=>{
            teams.push(m.Gyoztes!);
            if(m.Gyoztes?.includes('Loser of')){
              losersFrom.push(parseInt(m.Gyoztes!.match(/(\d+)/)![0]))
            }
          })
        }
        else if(prevFullBye){
          newGame['Gyoztes'] = teams[0];
        }
        while(teams.length != 2){
          teams.push("");
          losersFrom.push(-1);
        }
        newGame['Csapatok'] = teams;
        newGame['losersFrom'] = losersFrom;
        if(matchesAdded%2 == 1){ // 1 VAN BERAKVA => FELSŐ
            nextRoundID++;
            matchesAdded++;
        }
        else{ //0 VAN BERAKVA => ALSÓ
            if(RoundNumber %2 == 1){
              nextRoundID++;
            }
            matchesAdded = 1;
        }
        newGame['bottom'] = matchesAdded-1;
        loserGames.push(newGame)
      }

    }
    let lastMatchofLosers: Match = loserGames[loserGames.length-1];
    lastMatchofLosers['bottom'] = 1; //Az utsó bottom beállítása 1-re
    let lastMatchofWinners:Match = this.GeneratedGames[this.GeneratedGames.length-1];
    lastMatchofWinners.nextRoundID = (nextRoundID) //Utolsó Winner meccs megkeresése és nextRound-jának beállítása
    nextRoundID++;
    let finalGame1 = {Meccs_id: matchID, loser: false, final: true, bye: false, Csapatok: ["Winner of Winner's Bracket", "Winner of Loser's Bracket"],
          Gyoztes: "", Round: RoundNumber, score0: null, score1: null, bottom: 0, nextRoundID: nextRoundID}
    matchID++;
    nextRoundID++;
    RoundNumber++;
    let finalGame2 = {Meccs_id: matchID, loser: false, final: true, bye: false, Csapatok: [`Winner of ${matchID-1} (if needed)`, `Loser of ${matchID-1}`],
          Gyoztes: "", Round: RoundNumber, score0: null, score1: null, bottom: 0, nextRoundID: -1, losersFrom: [-1, matchID-1]}
    
    loserGames.forEach(m=>{
      this.GeneratedGames.push(m);
    })
    this.GeneratedGames.push(finalGame1);
    this.GeneratedGames.push(finalGame2);
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
