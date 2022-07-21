import { DataService } from './../services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { CacheElement, Group, GroupPlayer, Match } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class GroupHelperService {
  @Output() groupsChanged = new EventEmitter<{groups: Group[], gameName: string}>();

  constructor(private httpservice: HttpService, private dataservice:DataService) { }
  loadCache(gameType: string){
    this.httpservice.getCacheFromGame(gameType).subscribe(res=>{
      let myarray:Array<CacheElement> = Object.values(res);
      if(myarray.length <= 0) return;
      let gameName = "";
      myarray.forEach(cacheEl=>{
        if(cacheEl.bracketType == 'group-stage'){
          gameName = cacheEl.gameName;
        }
      })
      if(gameName == "") return;
      this.httpservice.getGroupStage(gameName).subscribe(data=>{
        this.loadGroupsFromDataObject(data, gameName);
      })
    })
  }
  loadGroup(gameName:string){
    if(gameName == "") return;
    this.httpservice.getGroupStage(gameName).subscribe(data=>{
      this.loadGroupsFromDataObject(data, gameName);
    })
  }
  loadGroupsFromDataObject(data, gameName:string){
    let groups:Group[] = []
    let myarray = Object.values(data);
    let newGroup:Group = {groupName: '',teams: [], qualifyNumber: 0}
    myarray.forEach((MYSQL_OBJECT:any) => {
      let newPlayer:GroupPlayer = {
        name: MYSQL_OBJECT.playerName,
        wins: MYSQL_OBJECT.wins,
        loses: MYSQL_OBJECT.loses,
        draws: MYSQL_OBJECT.draws,
        points: MYSQL_OBJECT.points,
        last3Results: MYSQL_OBJECT.last3Results.split(""),
        diff: MYSQL_OBJECT.diff
      }
      if(newGroup.groupName == ''){
        newGroup.groupName = MYSQL_OBJECT.groupName;
        newGroup.qualifyNumber = MYSQL_OBJECT.qualifyNumber;
        newGroup.teams.push(newPlayer);
      }
      else if( newGroup.groupName != MYSQL_OBJECT.groupName){
        groups.push(newGroup);
        newGroup = {groupName:MYSQL_OBJECT.groupName, teams:[newPlayer], qualifyNumber:MYSQL_OBJECT.qualifyNumber};
      }
      else{
        newGroup.teams.push(newPlayer);
      }
    });
    if(newGroup.teams.length > 0) groups.push(newGroup);
    this.groupsChanged.emit({groups: groups, gameName: gameName});
  }
  loadFinalStage(finishedGroups:Group[], gameName, gameType){
    console.log('groups', finishedGroups);
    this.httpservice.getSEMatch(gameName).subscribe(data=>{
      let seMatches = this.dataservice.loadMatchesFromDataObject(data);
      seMatches.forEach(match=>{
        if(match.Csapatok[0].includes('helyezett')){
          finishedGroups.forEach(group=>{
            if(match.Csapatok[0].includes(group.groupName)){
              let place = parseInt(match.Csapatok[0].match(/\d+/)![0]);
              console.log(match.Csapatok[0], group.teams[place-1].name, 'groupname: ', group.groupName);
              match.Csapatok[0] = group.teams[place-1].name;
            }
          })
        }
        if(match.Csapatok[1].includes('helyezett')){
          finishedGroups.forEach(group=>{
            if(match.Csapatok[1].includes(group.groupName)){
              let place = parseInt(match.Csapatok[1].match(/\d+/)![0]);
              console.log(match.Csapatok[1], group.teams[place-1].name, 'groupname: ', group.groupName);
              match.Csapatok[1] = group.teams[place-1].name;
            }
          })
        }
        if(match.Gyoztes.includes('helyezett')){
          finishedGroups.forEach(group=>{
            if(match.Gyoztes.includes(group.groupName)){
              let place = parseInt(match.Gyoztes.match(/\d+/)![0]);
              console.log(match.Gyoztes, group.teams[place-1].name, 'groupname: ', group.groupName);
              match.Gyoztes = group.teams[place-1].name;
            }
          })
        }
      })
      this.httpservice.saveSEGame({body: seMatches, name: gameName, type:gameType}).subscribe({});
    })
  }
  saveCache(gameName:string, gameType:string){
    this.httpservice.saveCache({gameName: gameName, bracketType:'group-stage', gameType:gameType}).subscribe({})
  }
  saveGroups(gameName:string, gameType:string, groups:Group[]){
    this.httpservice.saveGroupStage({body: groups, name: gameName, type:gameType}).subscribe({});
  }
  saveSEGame(gameName:string, gameType:string, matches:Match[]){
    this.httpservice.saveSEGame({body: matches, name: gameName, type:gameType}).subscribe({});
  }
}
