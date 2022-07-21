import { swissPlayer, Match } from './../services/data.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tieBreaker'
})
export class TieBreakerPipe implements PipeTransform {

  transform(players: swissPlayer[], matches: Match[]): swissPlayer[] {

    players.forEach(p=>{
      p['opponentScores'] = 0
      matches.forEach(m=>{
        let otherPlayer = ""
        if(m.Csapatok[0] == p.name){
          otherPlayer = m.Csapatok[1];
        }
        else if(m.Csapatok[1] == p.name){
          otherPlayer = m.Csapatok[0];
        }
        if(otherPlayer != ""){
          let opp = players.filter(player=>{ return player.name == otherPlayer})
          if(opp.length > 0){
            p['opponentScores'] += opp[0].points;
          }
        }
      })
    })
    players = players.sort((a:swissPlayer,b:swissPlayer) =>{
      let bWin = 0;
      if(a.points == b.points){
        matches.forEach(m=>{
          if(m.Csapatok.includes(a.name) && m.Csapatok.includes(b.name)){
            if(m.Gyoztes == a.name){bWin = -1;console.log(a.name, '>>>', b.name);}
            else if(m.Gyoztes == b.name){bWin = 1;console.log(b.name, '>>>', a.name);}
          }
        })
        if(bWin == 0){
          if(b['opponentScores'] > a['opponentScores']){bWin = 1}
          else if(b['opponentScores'] < a['opponentScores']){bWin = -1}
        }
        if(bWin == 0){
          if(b.eloRating > a.eloRating){bWin = 1}
          else if(b.eloRating < a.eloRating){bWin = -1}
        }
        // if(bWin == 0){
        //   if (b['opponentScores'] > a['opponentScores']){bWin = 1;}
        //   else if (b['opponentScores'] < a['opponentScores']){bWin = -1}
        // }
      }
      return bWin
    })
    return players;
  }
}
