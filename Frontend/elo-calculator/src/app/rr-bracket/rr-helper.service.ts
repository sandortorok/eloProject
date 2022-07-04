import { EventEmitter, Injectable, Output } from '@angular/core';
import { CacheElement, Group, Match } from '../services/data.service';
import { HttpService } from '../services/http.service';
import { playerScore } from './rr-bracket.component';

@Injectable({
  providedIn: 'root'
})
export class RRHelperService {
  @Output() matchesLoaded = new EventEmitter<{matches: Match[], gameName:string}>();

  constructor(private httpservice: HttpService) { }
  loadCache(gameType){
    this.httpservice.getCacheFromGame(gameType).subscribe(res=>{
      let myarray:Array<CacheElement> = Object.values(res);
      if(myarray.length <= 0) return;
      let gameName = ""
      myarray.forEach(cacheEl=>{
        if(cacheEl.bracketType == 'round-robin'){
          gameName = cacheEl.gameName;
        }
      })
      if(gameName == "") return;
      this.httpservice.getRRMatch(gameName).subscribe(data=>{
        this.loadMatchesFromDataObject(data, gameName);
      })
    })
  }
  loadGroupMatches(gameName:string){
    this.httpservice.getRRMatch(gameName).subscribe(data=>{
      this.loadMatchesFromDataObject(data, gameName);
    })
  }
  loadMatchesFromDataObject(data, gameName){
    let matches:Match[] = []
    let myarray = Object.values(data);
    myarray.forEach((match:any)=>{
      let newMatch:Match = {
        Csapatok: [match.player1, match.player2], Gyoztes: match.winner, bye: match.bye, Meccs_id: match.match_ID, Round: match.round,
        nextRoundID: -1,
        bottom: 0,
        score0: match.score1,
        score1: match.score2
      };
      if(match.groupName){
        newMatch['groupName'] = match.groupName;
      }
      matches.push(newMatch);
    })
    this.matchesLoaded.emit({matches: matches, gameName: gameName});
  }
  saveCache(gameName:string, gameType:string){
    this.httpservice.saveCache({gameName: gameName, bracketType:'round-robin', gameType:gameType}).subscribe({})
  }
  saveGroupCache(gameName:string, gameType:string){
    this.httpservice.saveCache({gameName: gameName, bracketType:'group-stage', gameType:gameType}).subscribe({})
  }
  saveRRGame(gameName:string, gameType:string, matches:Match[], groupMode = false){
    this.httpservice.saveRRGame({body: matches, name: gameName, type:gameType, groupMode:groupMode}).subscribe({});
  }
  loadPlayerStats(matches:Match[]){
    let players:playerScore[] = [];
    let playerNames:string[] = []
    matches.forEach(m=>{
      if(m.Csapatok[0]!= "" && !playerNames.includes(m.Csapatok[0])){
        playerNames.push(m.Csapatok[0])
      }
      if(m.Csapatok[1]!= "" && !playerNames.includes(m.Csapatok[1])){
        playerNames.push(m.Csapatok[1])
      }
    })
    playerNames.forEach(player => {
      let newPlayerScore:playerScore = {name: player,wins: 0,loses: 0}
      matches.forEach(m=>{
        if(m.bye != true && m.Gyoztes!="" && m.Csapatok.includes(player)){
          if(m.Gyoztes == player){
            newPlayerScore.wins+=1;
          }
          else {
            newPlayerScore.loses+=1;
          }
        }
      })
      players.push(newPlayerScore);
    });
    return players;
  }
}
