import { DataService } from './../services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LoadModal } from '../modals/load-modal/load-modal.component';
import { CacheElement, Group, Match } from '../services/data.service';
import { HttpService } from '../services/http.service';
import { playerScore } from './rr-bracket.component';

@Injectable({
  providedIn: 'root'
})
export class RRHelperService {
  @Output() matchesLoaded = new EventEmitter<{matches: Match[], gameName:string}>();

  constructor(private httpservice: HttpService, private dataservice: DataService) { }
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
      this.getMatch(gameName);
    })
  }
  getMatch(gameName:string){
    this.httpservice.getRRMatch(gameName).subscribe(data=>{
      let matches = this.dataservice.loadMatchesFromDataObject(data)
      this.matchesLoaded.emit({matches: matches, gameName: gameName})
    })
  }

  saveCache(gameName:string, gameType:string){
    this.httpservice.saveCache({gameName: gameName, bracketType:'round-robin', gameType:gameType}).subscribe({})
  }
  saveGroupCache(gameName:string, gameType:string){
    this.httpservice.saveCache({gameName: gameName, bracketType:'group-stage', gameType:gameType}).subscribe({})
  }
  saveRRGame(gameName:string, gameType:string, matches:Match[]){
    this.httpservice.saveRRGame({body: matches, name: gameName, type:gameType}).subscribe({});
  }
  loadPlayerStats(matches:Match[]){
    let playerScores:playerScore[] = [];
    let playerNames:string[] = []
    matches.forEach(m=>{
      m.Csapatok.forEach(csapat=>{
        if(csapat != "" && !playerNames.includes(csapat)){
          playerNames.push(csapat)
        }
      })
    })
    playerNames.forEach(player => {
      let newPlayerScore:playerScore = {name: player,wins: 0,loses: 0, draws:0}
      matches.forEach(m=>{
        if (m.Gyoztes == "draw" && m.Csapatok.includes(player)){
          newPlayerScore.draws+=1
        }
        else if (m.bye != true && m.Gyoztes!="" && m.Csapatok.includes(player)){
          if (m.Gyoztes == player){
            newPlayerScore.wins+=1;
          }
          else {
            newPlayerScore.loses+=1;
          }
        }
      })
      playerScores.push(newPlayerScore);
    });
    return playerScores;
  }
  updateGroups(groups:Group[], updatedMatch:Match): Group[]{
    let p1 = updatedMatch.Csapatok[0];
    let p2 = updatedMatch.Csapatok[1];
    let winner = updatedMatch.Gyoztes;
    let diff = 0;
    if(updatedMatch.score0!=null && updatedMatch.score1!=null){
      diff = Math.abs(updatedMatch.score0-updatedMatch.score1);
    }
    groups.forEach(group=>{
      group.teams.forEach(team=>{
        if(team.name == p1 || team.name == p2){
          if (winner == 'draw'){
            team.draws +=1;
            team.points+=1
            team.last3Results.unshift('D');
          }
          else if (team.name == winner){
            team.wins+=1;
            team.points+=3;
            team.last3Results.unshift('W');
            team.diff += diff

          }
          else{
            team.loses+=1;
            team.diff -= diff
            team.last3Results.unshift('L');
          }
          if(team.last3Results.length > 3) {team.last3Results.pop();}
        }
      })
    })
    return groups
  }
  giveHoverEffect(teamElements, matches){
    teamElements.forEach(el => {
      if (el.onmouseover != null) el.onmouseover = null;
      if (el.onmouseleave != null) el.onmouseleave = null;
    });
    let players:string[] = []
    matches.forEach(match=>{
      let p1 = match.Csapatok[0];
      let p2 = match.Csapatok[1];
      if(p1 != "" && !players.includes(p1)){
        players.push(p1);
      }
      if(p2 != "" && !players.includes(p2)){
        players.push(p2);
      }
    })
    players.forEach(playerName => {
      let samePlayer: any[] = []
      teamElements.forEach(el => {
        if (el.firstChild.textContent.trim() == playerName) {
          samePlayer.push(el)
        }
      });
      samePlayer.forEach(e => {
        e.onmouseover = () => {
          samePlayer.forEach(same => {
            same.style.border = "1px solid rgb(71, 228, 9)";
            same.style.opacity = 1;
            same.style.boxShadow = "0 0 5px rgb(71, 228, 9), 0 0 25px rgb(71, 228, 9)"
          })
        }
        e.onmouseleave = () => {
          samePlayer.forEach(same => {
            same.style.border = "";
            same.style.opacity = "";
            same.style.boxShadow = ""
          })
        }
      })
    });
  }
}
