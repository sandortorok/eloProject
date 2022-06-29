import { HttpService } from './http.service';
import { Injectable } from '@angular/core';


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

export interface CacheElement {
  gameName: string;
  gameType: string;
  bracketType:string;
  lastSaved: string;
}
export interface Player {
  name: string;
  rating: number;
  games: number;
  gameType?:string;
}

export interface Team{
  teamName:string,
  name1: string,
  name2?: string,
  name3?: string,
  name4?: string,
  name5?: string,
  name6?: string,
  name7?: string,
  rating?: number,
  games?:number
}

@Injectable({
  providedIn: 'root'
})
export class DataService {;
  volleyBallTeams: Team[] = []
  eloPlayers:Player[] = [];

  constructor(private httpservice: HttpService) {
    this.loadVolleyTeams();
    this.loadEloPlayers();
  }
  
  loadEloPlayers(){
    this.httpservice.getEloPlayers().subscribe(data=>{
      let myarray:Player[] = Object.values(data);
      myarray.forEach(player=>{
        this.eloPlayers.push(player);
      })
    })
  }
  loadVolleyTeams(){
    this.httpservice.getVolleyTeams().subscribe(data=>{
      let myarray = Object.values(data);
      myarray.forEach(team=>{
        this.volleyBallTeams.push(team);
      })
    })
  }
  expectedWin(RatingA, RatingB){
    let expected = 1/(1+Math.pow(10, (RatingB-RatingA)/400));
    return expected;
  }

  newRating(RatingA, ExpectedA, ScoreA, K = 100){
    let newR = RatingA + K*(ScoreA- ExpectedA)
    return newR
  }

  match(RatingA, RatingB, AWin){
    let newA = this.newRating(RatingA, this.expectedWin(RatingA, RatingB), AWin)
    let newB = RatingA + RatingB - newA
    RatingB = newB
    RatingA = newA
    return {1: RatingA, 2: RatingB}
  }
}
