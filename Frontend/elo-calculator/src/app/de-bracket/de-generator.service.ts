import { DataService, Player, Team } from '../services/data.service';
import { Injectable, Output, EventEmitter } from '@angular/core';


export interface Match{
  Csapatok?: string[],
  Round?: number,
  nextRoundID?: number,
  score0?: number | null,
  score1?: number | null,
  Gyoztes?: string,
  Meccs_id?: number,
  bottom?: number,
  bye?: boolean,
  loser?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DEGeneratorService {
  constructor(private data: DataService) {
  }
  
  GeneratedGames:Match[] = [];
  GeneratedLosers:Match[] = [];
  GeneratedFinals:Match[] = [];
  exampleTeams:string[] = []
  @Output() generated = new EventEmitter();

  startGenerating(gameType: string = 'example', players?: string[], teams?: Team[]){
    let players_length = 14;
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
        let newGame:Match = {};
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
        newGame['Gyoztes'] = "";
        newGame['score0'] = null;
        newGame['bye'] = false;
  
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
        newGame['score1'] = null;
        newGame['Meccs_id'] = matchID;
        matchID++;
        newGame['Csapatok'] = teams;
        newGame['Round'] = RoundNumber;
        games.push(newGame);
      }
    }
    this.GeneratedGames = games;
    //LOSER BRACKET
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    Meccsek_Száma = closestBase/2/2;
    RoundNumber = 1;
    let LoserRoundID = 0;
    matchesAdded = 0;
    nextRoundID = Meccsek_Száma + games.length;
    let loserGames:Match[] = []
    //ROUND 1
    for(let i = 0; i < Meccsek_Száma; i++){
        let newGame = {}
        newGame['Meccs_id'] = matchID
        newGame['Loser'] = true;
        matchID++
        let teams:string[] = []
        newGame['bye'] = false
        if(games[LoserRoundID].bye == true){
            newGame['bye'] = true;
            teams.push("")
        }
        else{
            teams.push(`Loser of Match: ${LoserRoundID}`)
        }
        LoserRoundID++;
        if(games[LoserRoundID].bye == true){
            newGame['bye'] = true;
            teams.push("")
        }
        else{
            teams.push(`Loser of Match: ${LoserRoundID}`)
        }
        LoserRoundID++;
        teamNumber += 2;
        newGame['Csapatok'] = teams
        newGame['Round'] = RoundNumber
        newGame['score0'] = null;
        newGame['score1'] = null;
        if(matchesAdded%2 == 0){ // FELSŐ MECCS
          newGame['bottom'] = 0;
          newGame['nextRoundID'] = nextRoundID;
          nextRoundID++
          matchesAdded++; 
        }
        else{ //Alsó meccs
          newGame['bottom'] = 1;
          newGame['nextRoundID'] = nextRoundID;
          nextRoundID++;
          matchesAdded = 1;
        }
        newGame['Gyoztes'] = "";
        if(teams[0] == "" && teams[1] == ""){ //HA MINDKETTŐ ÜRES
          
        }
        else if(teams[0] == ""){
          newGame["Gyoztes"] = teams[1];
        }
        else if(teams[1] == ""){
          newGame["Gyoztes"] = teams[0];
        }
        loserGames.push(newGame)
      }

    while(Meccsek_Száma != 1){
        let prevRound:Match[] = [];
        prevRound = loserGames.filter(el => {
          return el['Round'] == RoundNumber;
        })
        RoundNumber++;
        Meccsek_Száma = Meccsek_Száma;
        matchesAdded = 0;
        LoserRoundID += Meccsek_Száma-1;//HOGY FORDÍTVA ADJA MOST HOZZÁ
        // 1 LOSER PER GAME
        for(let i = 0; i < Meccsek_Száma; i++){
            let prevHasWinner = false
            let prevMatch;
            let prevFullBye = false
            prevRound.forEach(match=>{
              if(match.nextRoundID == matchID && match.Gyoztes!.length > 0){
                prevHasWinner = true;
                prevMatch = match;
              }
              else if(match.nextRoundID == matchID && match.Csapatok![0].length == 0 && match.Csapatok![1].length == 0 && RoundNumber == 2){
                prevFullBye = true;
              }
            })
            let newGame = {}
            newGame['Meccs_id'] = matchID
            matchID++
            newGame['Loser'] = true;
            newGame['bye'] = false
            let teams:string[] = []
            teams.push(`Loser of Match: ${LoserRoundID}`)
            LoserRoundID--;
            newGame['Gyoztes'] = "";
            if(prevHasWinner){
              teams.push(prevMatch.Gyoztes!)
              console.log(prevMatch.Gyoztes);
            }
            else if(prevFullBye){
              newGame['Gyoztes'] = teams[0];
              teams.push("")
            }
            else{
              teams.push("")
            }
            newGame['Csapatok'] = teams
            newGame['Round'] = RoundNumber
            newGame['score0'] = null;
            newGame['score1'] = null;
            if(matchesAdded%2 == 1){ // FELSŐ MECCS
                newGame['bottom'] = 0;
                newGame['nextRoundID'] = nextRoundID;
                nextRoundID++;
                matchesAdded++;
            }
            else{ //ALSÓ
                newGame['bottom'] = 1;
                newGame['nextRoundID'] = nextRoundID;
                matchesAdded = 1;
            }
            newGame['bottom'] = matchesAdded-1;
            loserGames.push(newGame)
        }
        LoserRoundID += (Meccsek_Száma+1); // mert most fordítva adtuk hozzá
        Meccsek_Száma = Meccsek_Száma / 2;
        prevRound = [];
        prevRound = loserGames.filter(el => {
          return el['Round'] == RoundNumber;
        })
        RoundNumber++;
        matchesAdded = 0;
        //0 LOSER PER GAME
        for(let i = 0; i < Meccsek_Száma; i++){
            let prevHasWinner = false
            let prevMatch;
            let prevFullBye = false
            prevRound.forEach(match=>{
              if(match.nextRoundID == matchID && match.Gyoztes!.length > 0){
                prevHasWinner = true;
                prevMatch = match;
              }
              else if(match.nextRoundID == matchID && match.Csapatok![0].length == 0 && match.Csapatok![1].length == 0 && RoundNumber == 2){
                prevFullBye = true;
              }
            })
            let newGame = {}
            newGame['Meccs_id'] = matchID
            matchID++
            newGame['Loser'] = true;
            newGame['bye'] = false
            newGame['Gyoztes'] = "";
            let teams:string[] = []
            if(prevHasWinner){
              teams.push(prevMatch.Gyoztes!)
              console.log(prevMatch.Gyoztes);
            }
            else if(prevFullBye){
              newGame['Gyoztes'] = teams[0];
              teams.push("")
            }
            else{
              teams.push("")
            }
            teams.push("")
            newGame['Gyoztes'] = "";
            newGame['Csapatok'] = teams
            newGame['Round'] = RoundNumber
            newGame['score0'] = null;
            newGame['score1'] = null;
            if(matchesAdded%2 == 0){ // FELSŐ MECCS
                newGame['nextRoundID'] = nextRoundID;
                nextRoundID++;
                matchesAdded++;
            }
            else{
                newGame['nextRoundID'] = nextRoundID;
                nextRoundID++;
                matchesAdded = 1;
            }
            newGame['bottom'] = matchesAdded-1;
            loserGames.push(newGame)
        }
    }
    RoundNumber++;
    Meccsek_Száma = Meccsek_Száma;
    matchesAdded = 0;
    // 1 LOSER PER GAME
    for(let i = 0; i < Meccsek_Száma; i++){
        let newGame = {}
        newGame['Meccs_id'] = matchID
        matchID++
        newGame['Loser'] = true;
        newGame['bye'] = false
        let teams:string[] = []
        teams.push(`Loser of Match: ${LoserRoundID}`)
        LoserRoundID++;
        teams.push("")
        newGame['Gyoztes'] = "";
        newGame['Csapatok'] = teams
        newGame['Round'] = RoundNumber
        newGame['score0'] = null;
        newGame['score1'] = null;
        if(matchesAdded%2 == 1){ // FELSŐ MECCS
            newGame['bottom'] = 0;
            newGame['nextRoundID'] = nextRoundID;
            nextRoundID++;
            matchesAdded++;
        }
        else{ //ALSÓ
            newGame['bottom'] = 1;
            newGame['nextRoundID'] = nextRoundID;
            matchesAdded = 1;
        }
        newGame['bottom'] = matchesAdded-1;
        loserGames.push(newGame)
    }
    for(let i = 0; i < Meccsek_Száma; i++){
      let newGame = {}
      newGame['Meccs_id'] = matchID
      matchID++
      newGame['Loser'] = true;
      newGame['bye'] = false
      let teams:string[] = []
      teams.push(`Winner of Winner's Bracket`)
      teams.push("Winner of Loser's Bracket")
      newGame['Gyoztes'] = "";
      newGame['Csapatok'] = teams
      newGame['Round'] = RoundNumber
      newGame['score0'] = null;
      newGame['score1'] = null;
      if(matchesAdded%2 == 1){ // FELSŐ MECCS
          newGame['bottom'] = 0;
          newGame['nextRoundID'] = nextRoundID;
          nextRoundID++;
          matchesAdded++;
      }
      else{ //ALSÓ
          newGame['bottom'] = 1;
          newGame['nextRoundID'] = nextRoundID;
          matchesAdded = 1;
      }
      newGame['bottom'] = matchesAdded-1;
      this.GeneratedFinals.push(newGame)
  }
    this.GeneratedLosers = loserGames;
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
