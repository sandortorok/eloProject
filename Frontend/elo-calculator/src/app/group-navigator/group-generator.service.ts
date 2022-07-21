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
    this.GeneratedGroups = []
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let numberOfGroups = Math.ceil(players.length/groupSize);
    for(let i = 0; i < numberOfGroups; i++){
      let newGroup:Group = {groupName: `${alphabet[i]} Csoport`,teams: [], qualifyNumber: qualify};
      this.GeneratedGroups.push(newGroup);
    }
    let allTeams:GroupPlayer[][] = []
    for(let i = 0; i < numberOfGroups; i++){
      allTeams.push([])
    }
    for(let i = 0; i < players.length; i++){
      let newPlayer:GroupPlayer = { name: players[i],wins: 0,loses: 0,draws: 0,points: 0,last3Results: [], diff:0 }
      allTeams[i%numberOfGroups].push(newPlayer)
    }
    this.GeneratedGroups.forEach((group, index)=>{
      group.teams = allTeams[index];
    })
  }
  loadExampleTeams(how_many){
    this.exampleTeams = [];
    for (let i = 0; i < how_many; i++) {
      this.exampleTeams.push(`${i + 1}. Játékos`);
    }
  }
  constructor() { }
}