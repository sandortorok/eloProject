import { Group } from 'src/app/services/data.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupName'
})
export class GroupNamePipe implements PipeTransform {

  transform(groups: Group[]): string[] {
    groups = groups.sort((a,b)=>{
      if (a.groupName > b.groupName) return 1; 
      if (a.groupName < b.groupName) return -1;
      return 0;
    })
    let groupNames:string[] = [];
    groups.forEach(group=>{
      if(!groupNames.includes(group.groupName)){
        groupNames.push(group.groupName);
      }
    })
    return groupNames;
  }

}
