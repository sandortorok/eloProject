import { Pipe, PipeTransform } from '@angular/core';
import { Match } from '../services/data.service';

@Pipe({
  name: 'sechampions'
})
export class SechampionsPipe implements PipeTransform {

  transform(matches: Match[], type: string): Match|undefined {
    let final:Match;
    let semi1:Match;
    let semi2:Match;
    let third:Match;

    for (let i = 0; i < 10; i++) {
      let newRound:Match[] = matches.filter(el => { return el.Round == (i + 1) });
      if (newRound.length == 2) {
        semi1 = newRound[0]
        if(type == 'semi1') return semi1;
        semi2 = newRound[1]
        if (type == 'semi2') return semi2;
      }
      else if (newRound.length == 1 && newRound[0].thirdPlace != true) {
        final = newRound[0]
        if(type == 'final') return final;
      }
      else if (newRound.length == 1 && newRound[0].thirdPlace == true) {
        third = newRound[0]
        if(type == 'thirdPlace') return third;
      }
    }
    return undefined;
  }
}
