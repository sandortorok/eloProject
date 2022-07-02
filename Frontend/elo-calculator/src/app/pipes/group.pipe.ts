import { Pipe, PipeTransform } from '@angular/core';
import { Match } from '../services/data.service';

@Pipe({
  name: 'myGroupPipe'
})
export class GroupPipe implements PipeTransform {

  transform(matches: Match[], name: string): Match[] {
    return matches.filter(m=>{return m.groupName == name});
  }

}
