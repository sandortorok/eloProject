import { Pipe, PipeTransform } from '@angular/core';
import { Match } from '../de-bracket/de-generator.service';

@Pipe({
  name: 'rounds'
})
export class RoundsPipe implements PipeTransform {

  transform(matches: Match[], type: string): Match[][] {
    let rounds:Match[][] = []
    let newMatches:Match[] = []
    if(type == 'winner'){
      newMatches = matches.filter(m=>{ return m.loser == false && m.final == false})
    }
    if(type == 'loser'){
      newMatches = matches.filter(m=>{ return m.loser == true && m.final == false})
    }
    if(type == 'final'){
      newMatches = matches.filter(m=>{ return m.loser == false && m.final == true})
    }
    for (let i = 0; i < 10; i++) {
      let newRound = newMatches.filter(el => { return el.Round == (i + 1) });
      if (newRound.length > 0) {
        rounds.push(newRound)
      }
    }
    return rounds;
  }

}
