import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../services/data.service';

@Pipe({
  name: 'sort'
})
export class PlayerSortPipe implements PipeTransform {

  transform(array: Player[], field: string): any[] {
    if (!Array.isArray(array)) {
      return [];
    }
    array.sort((a: Player, b: Player) => {
      if (a[field] > b[field]) {
        return -1;
      } else if (a[field] < b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
