import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../services/data.service';

@Pipe({
  name: 'sort'
})
export class PlayerSortPipe implements PipeTransform {

  transform<Type>(array: Type[], fields: string[]): Type[] {
    if (!Array.isArray(array)) {
      return [];
    }
    array.sort((a: Type, b: Type) => {
      let num = 0
      let assigned = false;
      fields.forEach(field=>{ //sortolás akárhány field alapján
        if (a[field] > b[field]) {
          if(!assigned){
            num = -1;
            assigned = true;
          }
        } else if (a[field] < b[field]) {
          if(!assigned){
            num = 1;
            assigned = true;
          }
        }
      })
      return num;
    });
    return array;
  }

}
