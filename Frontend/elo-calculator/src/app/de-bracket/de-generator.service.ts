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
    let players_length = 7;
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
      let newGame:Match = {};
      
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
      let newGame = {};
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
        Meccsek_Száma = Meccsek_Száma / 2;
        RoundNumber++;
        matchesAdded = 0;
        //0 LOSER PER GAME
        for(let i = 0; i < Meccsek_Száma; i++){
            let newGame = {}
            newGame['Meccs_id'] = matchID
            matchID++
            newGame['Loser'] = true;
            newGame['bye'] = false
            let teams:string[] = []
            teams.push("")
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
