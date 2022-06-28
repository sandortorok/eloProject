import { Pipe, PipeTransform } from '@angular/core';
import { Match } from '../de-bracket/de-generator.service';

@Pipe({
  name: 'sechampions'
})
export class SechampionsPipe implements PipeTransform {

  transform(matches: Match[], type: string): Match|undefined {
    let final:Match;
    let semi1:Match;
    let semi2:Match;
    let team32 = false;
    if (matches.length > 20) team32 = true;
    for (let i = 0; i < 7; i++) {
      let newRound:Match[] = matches.filter(el => { return el.Round == (i + 1) });
      if (newRound.length == 2 && team32) {
        semi1 = newRound[0]
        if(type == 'semi1') return semi1;
        semi2 = newRound[1]
        if (type == 'semi2') return semi2;
      }
      else if (newRound.length == 1 && team32) {
        final = newRound[0]
        if(type == 'final') return final;
      }
    }
    return undefined;
  }
}
