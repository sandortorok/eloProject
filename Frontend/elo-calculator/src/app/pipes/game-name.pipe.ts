import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameType'
})
export class GameTypePipe implements PipeTransform {

  transform(name:string): string {
    switch(name){
      case 'ping-pong-páros':
        return 'Páros Ping Pong'
      case 'ping-pong':
        return 'Ping Pong'
      default:
        return name
    }
  }

}
