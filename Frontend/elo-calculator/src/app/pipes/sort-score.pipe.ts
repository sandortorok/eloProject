import { Pipe, PipeTransform } from '@angular/core';
import { playerScore } from '../rr-bracket/rr-bracket.component';

@Pipe({
  name: 'sortScore'
})
export class sortScorePipe implements PipeTransform {

  transform(players: playerScore[], sortBy: string): playerScore[] {
    if (sortBy == 'WinRate') {
      players = players.sort((a, b) => {
        if ((b.wins - a.wins) != 0) {
          return b.wins - a.wins;
        }
        else {
          return a.loses - b.loses;
        }
      })
    }
    return players
  }

}
