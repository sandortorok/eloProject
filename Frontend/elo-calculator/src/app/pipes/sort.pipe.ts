import { Pipe, PipeTransform } from '@angular/core';

//Ha a field előtt ! van akkor fordítva sortolja azt a field-et
@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform<Type>(array: Type[], fields: string[]): Type[] {
    if (!Array.isArray(array)) {
      return [];
    }
    array.sort((a: Type, b: Type) => {
      let num = 0
      let assigned = false;
      fields.forEach(field=>{ //sortolás akárhány field alapján
        let reverse = false;
        if(field[0] == '!') {
          reverse = true;
          field = field.substring(1)
        };
        if (a[field] > b[field]) {
          if(!assigned){
            if(reverse) num = 1;
            else num = -1;
            assigned = true;
          }
        } else if (a[field] < b[field]) {
          if(!assigned){
            if(reverse) num = -1;
            else num = 1;
            assigned = true;
          }
        }
      })
      return num;
    });
    return array;
  }

}
