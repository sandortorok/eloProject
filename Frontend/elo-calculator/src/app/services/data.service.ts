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
  score0: number | null,
  score1: number | null,
  loser?: boolean;
  final?: boolean;
  losersFrom?: number[];
  groupName?:string;
  gameName?:string;
  white?:boolean;
}
interface MYSQL_MATCH{
  player1:string;
  player2:string;
  winner:string;
  bye:boolean;
  match_ID:number;
  nextMatch_ID:number;
  bottom:number;
  score1:number|null;
  score2:number|null;
  round:number
  loser?:boolean;
  final?:boolean;
  loserFrom1?:number;
  loserFrom2?:number;
  groupName?:string;
}
export interface CacheElement {
  gameName: string;
  gameType: string;
  bracketType:string;
  lastSaved: string;
}
export interface eloPlayer {
  name: string;
  rating: number;
  games: number;
  gameType:string;
}
export interface swissPlayer{
  name:string;
  eloRating: number;
  games: number;
  gameType:string;
  gameName:string;
  points:number;
  blackWhiteHistory?: string;
}
export interface Group{
  groupName:string;
  teams:GroupPlayer[];
  /**
   * Hány ember jut tovabb
   */
  qualifyNumber: number;
}
export interface GroupPlayer{
  name:string;
  wins:number;
  loses:number;
  draws:number;
  points:number;
  last3Results:string[];
  diff:number
}


@Injectable({
  providedIn: 'root'
})
export class DataService {;
  eloPlayers:eloPlayer[] = [];

  constructor(private httpservice: HttpService) {
    this.loadEloPlayers();
  }
  loadMatchesFromDataObject(data){
    let matches:Match[] = []
    let myarray:MYSQL_MATCH[] = Object.values(data);
    myarray.forEach((match)=>{
      let newMatch:Match = {Csapatok: [match.player1, match.player2], Gyoztes:match.winner, bye: match.bye, Meccs_id:match.match_ID,
      nextRoundID: match.nextMatch_ID, bottom: match.bottom, score0: match.score1, score1:match.score2, Round: match.round};
      if(match.loser != undefined){
        newMatch['final'] = match.final
        newMatch['losersFrom'] = [match.loserFrom1!, match.loserFrom2!]
        newMatch['loser'] = match.loser
      }
      if(match.groupName){
        newMatch['groupName'] = match.groupName;
      }
      matches.push(newMatch);
    })
    return matches
  }
  loadEloPlayers(){
    this.httpservice.getEloPlayers().subscribe(data=>{
      let myarray:eloPlayer[] = Object.values(data);
      myarray.forEach(player=>{
        this.eloPlayers.push(player);
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

  match(RatingA:number, RatingB:number, AWin:number){
    let newA = this.newRating(RatingA, this.expectedWin(RatingA, RatingB), AWin)
    let newB = RatingA + RatingB - newA
    RatingB = newB
    RatingA = newA
    return {newRatingA: RatingA, newRatingB: RatingB}
  }
}
