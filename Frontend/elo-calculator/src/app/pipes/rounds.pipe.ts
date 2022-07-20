import { Pipe, PipeTransform } from '@angular/core';
import { Match } from '../services/data.service';

@Pipe({
  name: 'rounds'
})
export class RoundsPipe implements PipeTransform {

  transform(matches: Match[], type?: string): Match[][] {
    let rounds:Match[][] = []
    let newMatches:Match[] = matches;
    switch (type){
      case 'winner':
        newMatches = matches.filter(m=>{ return m.loser == false && m.final == false})
        break;
      case 'loser':
        newMatches = matches.filter(m=>{ return m.loser == true && m.final == false})
        break;
      case 'final':
        newMatches = matches.filter(m=>{ return m.loser == false && m.final == true})
        break;
      case 'SELeft':
        return this.divideSEMatches(matches, 'SELeft');
      case 'SERight':
        return this.divideSEMatches(matches, 'SERight');
    }
    for (let i = 0; i < 20; i++) {
      let newRound = newMatches.filter(el => { return el.Round == (i + 1) });
      if (newRound.length > 0) {
        rounds.push(newRound)
      }
    }
    return rounds;
  }
  divideSEMatches(matches:Match[], needed:string){
    let rounds1:Match[][] = [];
    let rounds2:Match[][] = [];
    let semi1:Match[] = [];
    let semi2:Match[] = [];
    let final:Match[] = [];
    let team32 = false;
    if(matches.length > 30){
      team32 = true
    }
    for (let i = 0; i < 7; i++) {
      let newRound:any[] = matches.filter(el => { return el.Round == (i + 1) });
      if (newRound.length == 1) {
        //final
      }
      else if (newRound.length > 0) {
        if (team32) {
          let newRound2:any[] = newRound.splice(newRound.length / 2, newRound.length)
          rounds2.push(newRound2)
        }
        rounds1.push(newRound)
      }
    }
    if(needed == 'SELeft'){
      return rounds1;
    }
    if(needed == 'SERight'){
      return rounds2.slice().reverse();;
    }
    return rounds1;
  }
}
