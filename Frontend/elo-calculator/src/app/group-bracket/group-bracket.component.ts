import { HttpService } from 'src/app/services/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CacheElement, Group, GroupPlayer } from './../services/data.service';
import { GroupGeneratorService } from './group-generator.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SaveModal } from '../modals/save-modal/save-modal.component';

@Component({
  selector: 'app-group-bracket',
  templateUrl: './group-bracket.component.html',
  styleUrls: ['./group-bracket.component.scss'],
})
export class GroupBracketComponent implements OnInit {
  @Input() groups:Group[] = [];
  @Output() groupChange = new EventEmitter<Group[]>();
  gameName:string;
  @Input() gameType:string;
  constructor(private generator: GroupGeneratorService, private modalService: NgbModal, private httpservice: HttpService) { }

  ngOnInit(): void {
    if(this.groups.length == 0){
      this.loadCache();
      // this.generator.startGenerating('example');
    }
    this.generator.generated.subscribe(()=>{
      this.groups = this.generator.GeneratedGroups;
      this.groupChange.emit(this.groups);
    })
  }
  onNewGroup(){

  }
  onLoad(){

  }
  onSave(){
    if(this.groups == undefined) return;
    if(this.groups.length < 1) return;
    const modalRef = this.modalService.open(SaveModal, { centered: true });
    modalRef.componentInstance.matches = this.groups;
    modalRef.componentInstance.saveMode = 'group-stage';
    modalRef.componentInstance.gameType = this.gameType;
    if(this.gameName != '') modalRef.componentInstance.IN_gameID = this.gameName;
    modalRef.componentInstance.saveEvent.subscribe(name=>{
      this.gameName = name;
      this.saveCache();
    })
  }
  saveCache(){
    this.httpservice.saveCache({gameName: this.gameName, bracketType:'group-stage', gameType:this.gameType}).subscribe({})
  }
  loadCache(){
    this.httpservice.getCacheFromGame(this.gameType).subscribe(res=>{
      let myarray:Array<CacheElement> = Object.values(res);
      if(myarray.length <= 0) return;
      myarray.forEach(cacheEl=>{
        if(cacheEl.bracketType == 'group-stage'){
          this.gameName = cacheEl.gameName;
        }
      })
      if(this.gameName == "") return;
      this.groups = [];
      this.httpservice.getGroupStage(this.gameName).subscribe(data=>{
        this.loadGroupsFromDataObject(data);
      })
    })
  }
  loadGroupsFromDataObject(data){
    this.groups = []
    let myarray = Object.values(data);
    let newGroup:Group = {groupName: '',teams: [], qualifyNumber: 0}
    myarray.forEach((MYSQL_OBJECT:any) => {
      let newPlayer:GroupPlayer = {
        name: MYSQL_OBJECT.playerName,
        wins: MYSQL_OBJECT.wins,
        loses: MYSQL_OBJECT.loses,
        draws: MYSQL_OBJECT.draws,
        points: MYSQL_OBJECT.points,
        last3Results: []
      }
      if(newGroup.groupName == ''){
        newGroup.groupName = MYSQL_OBJECT.groupName;
        newGroup.qualifyNumber = MYSQL_OBJECT.qualifyNumber;
        newGroup.teams.push(newPlayer);
      }
      else if( newGroup.groupName != MYSQL_OBJECT.groupName){
        this.groups.push(newGroup);
        newGroup = {groupName:MYSQL_OBJECT.groupName, teams:[newPlayer], qualifyNumber:MYSQL_OBJECT.qualifyNumber};
      }
      else{
        newGroup.teams.push(newPlayer);
      }
    });
    if(newGroup.teams.length > 0) this.groups.push(newGroup);
    this.groupChange.emit(this.groups);
  }
  onPrintClick(){
    window.print();
  }
}
