import { GroupPlayer, Match } from '../services/data.service';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Group } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class GroupGeneratorService {
  GeneratedGroups:Group[] = [];
  exampleTeams:string[] = []
  @Output() generated = new EventEmitter();
  startGenerating(gameType: string = 'example', players: string[], groupSize?:number, qualifyNumber?:number){
    let players_length = 16;
    if (players == undefined){}
    switch (gameType){
      case 'example':
        this.loadExampleTeams(players_length);
        this.generateGroups(this.exampleTeams);
        setTimeout(() => {
          this.generated.emit();
        }, 1000);
        break;
      case 'withNames':
        this.generateGroups(players, groupSize, qualifyNumber);
        setTimeout(() => {
          this.generated.emit();
        }, 1000);
        break;
      default:
        this.loadExampleTeams(players_length);
        this.generateGroups(this.exampleTeams);
        break;
    }
  }
  generateGroups(players:string[], groupSize:number=4, qualify:number=2){
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.GeneratedGroups = [];
    let groupNumber = 0;  
    let newGroup:Group = {groupName: `${alphabet[groupNumber]} Csoport`,teams: [], qualifyNumber: qualify};
    groupNumber++;
    for(let p_idx = 0; p_idx < players.length; p_idx++){
      let newPlayer:GroupPlayer = { name: players[p_idx],wins: 0,loses: 0,draws: 0,points: 0,last3Results: [] }
      if(newGroup.teams.length == groupSize){
        this.GeneratedGroups.push(newGroup);
        newGroup = {groupName: `${alphabet[groupNumber]} Csoport`,teams: [], qualifyNumber: qualify};
        groupNumber++;
      }
      newGroup.teams.push(newPlayer);
    }
    if(newGroup.teams.length>0){
      this.GeneratedGroups.push(newGroup);
    }
  }
  loadExampleTeams(how_many){
    this.exampleTeams = [];
    for (let i = 0; i < how_many; i++) {
      this.exampleTeams.push(`${i + 1}. Játékos`);
    }
  }
  constructor() { }
}