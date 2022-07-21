import { User, UserService } from './../services/user-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupGeneratorService } from './group-generator.service';
import { GroupHelperService } from './group-helper.service';
import { Component, Input, OnInit } from '@angular/core';
import { Group, Match } from 'src/app/services/data.service';
import { SaveModal } from 'src/app/modals/save-modal/save-modal.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { RRHelperService } from 'src/app/rr-bracket/rr-helper.service';
import { RRGeneratorService } from 'src/app/rr-bracket/rr-generator.service';
import { LoadModal } from '../modals/load-modal/load-modal.component';
import { NewModal } from '../modals/new-modal/new-modal.component';
import { SEGeneratorService } from '../se-bracket/se-generator.service';

@Component({
  selector: 'app-group-navigator',
  templateUrl: './group-navigator.component.html',
  styleUrls: ['./group-navigator.component.scss']
})
export class GroupNavigatorComponent implements OnInit {
  groups: Group[];
  matches:Match[];
  SEMatches:Match[];
  @Input() gameType:string;
  gameName: string;
  user:User;
  private subscriptions: Array<Subscription> = [];
  constructor(
    private groupHelper: GroupHelperService, 
    private generator: GroupGeneratorService, 
    private modalService: NgbModal, 
    private rrhelper: RRHelperService,
    private rrGenerator: RRGeneratorService,
    private seGenerator: SEGeneratorService,
    private userservice: UserService
  ) { }

  ngOnInit(): void {
    this.loadCache();
    this.user = this.userservice.loggedUser;
    this.subscriptions.push(this.sub2UserChange())
    this.subscriptions.push(this.groupGeneratedSub());
    this.subscriptions.push(this.groupHelperSub());
    this.subscriptions.push(this.RRHelperSub());
  }
  saveCache() {
    this.groupHelper.saveCache(this.gameName, this.gameType);
  }
  loadCache() {
    this.groupHelper.loadCache(this.gameType);
  }
  onNewGroup() {
    const modalRef = this.modalService.open(NewModal, { centered: true });
    modalRef.componentInstance.groupMode = true;
    modalRef.componentInstance.generateEvent.subscribe((obj)=>{
      this.groups = [];
      this.matches = [];
      this.generator.startGenerating('withNames', obj.players, obj.groupSize, obj.qualifyNumber);
    })
  }
  onLoad(){
    const modalRef = this.modalService.open(LoadModal, { centered: true });
    modalRef.componentInstance.matches = this.matches;
    modalRef.componentInstance.gameType = this.gameType;
    modalRef.componentInstance.loadMode = 'group-stage';
    modalRef.componentInstance.loadGroupEvent.subscribe((loadData:{name:string})=>{
      this.gameName = loadData.name;
      this.groupHelper.loadGroup(this.gameName);
      this.saveCache();
    })
  }
  onSave() {
    if (this.groups == undefined) return;
    if (this.groups.length < 1) return;
    const modalRef = this.modalService.open(SaveModal, { centered: true });
    modalRef.componentInstance.matches = [];
    modalRef.componentInstance.saveMode = 'group-stage';
    modalRef.componentInstance.gameType = this.gameType;
    if (this.gameName != '') modalRef.componentInstance.IN_gameID = this.gameName;
    modalRef.componentInstance.saveEvent.subscribe(name => {
      this.gameName = name;
      this.rrhelper.saveRRGame(this.gameName, this.gameType, this.matches);
      this.groupHelper.saveGroups(this.gameName, this.gameType, this.groups);
      this.saveCache();
    })
  }
  onPrintClick() {
    window.print();
  }
  RRHelperSub():Subscription{
    return this.rrhelper.matchesLoaded.subscribe(obj=>{
      this.matches = obj.matches;
      this.gameName = obj.gameName;
    })
  }
  groupHelperSub():Subscription{
    return this.groupHelper.groupsChanged.subscribe(obj => {
      if (obj.groups.length > 0) {
        this.groups = obj.groups;
        this.gameName = obj.gameName;
        this.rrhelper.getMatch(this.gameName);
      }
    })
  }
  groupGeneratedSub():Subscription{
    return this.generator.generated.subscribe(() => {
      this.groups = this.generator.GeneratedGroups;
      this.gameName = Math.random().toString(36).slice(2, 7);
      this.matches = this.rrGenerator.generateGroupMatches(this.groups);
      let qualifiers:string[] = this.generateQualifiers();
      let sematches:Match[] = this.seGenerator.startGenerating('withNames', qualifiers);
      this.rrhelper.saveRRGame(this.gameName, this.gameType, this.matches);
      this.groupHelper.saveSEGame(this.gameName, this.gameType, sematches)
      this.groupHelper.saveGroups(this.gameName, this.gameType, this.groups);
      this.saveCache();
    })
  }
  sub2UserChange(){
    return this.userservice.userChanged.subscribe(()=>{
      this.user = this.userservice.loggedUser
    });
  }
  generateQualifiers():string[]{
    let names:string[] = []
    let qualifyNumber = this.groups[0].qualifyNumber
    for(let i = 0; i < qualifyNumber; i++){
    this.groups.forEach(group=>{
        if(group.teams.length >= i+1){
          names.push(`${group.groupName} ${i+1}.helyezett`);
        }
      })
    }
    let byes = this.getClosest(names.length) - names.length;
    let byePlayers:string[] = []
    for(let i = 0; i < byes; i++){
      let newName = names.shift();
      if(newName){
        byePlayers.push(newName);
      }
    }
    names = this.shuffle(names);
    let newNames:string[] = []
    let counter = 0;
    while(newNames.length != (names.length)){
      names.forEach(name=>{
        if(byePlayers.includes(name)) return;
        if(newNames.includes(name)) return;
        if(newNames.length == 0){
          newNames.push(name);
        }
        else{
          if(counter > 10){
            newNames.push(name);
            counter = 0;
          }
          let lastGroup = newNames[newNames.length-1].split(" ")[0];
          let thisGroup = name.split(" ")[0];
          if(thisGroup == lastGroup) return;
          let placeOfLast = newNames[newNames.length-1].split(" ")[2];
          let placeOfThis = name.split(" ")[2];
          if(placeOfLast == placeOfThis) return;
          newNames.push(name);
        }
      })
      counter++;
    }
    newNames.forEach(n=>{
      byePlayers.push(n)
    })
    return byePlayers
  }
  getClosest(players) {
    const knownBrackets = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
    for (let i = 0; i < knownBrackets.length; i++) {
      if (players == knownBrackets[i]) {
        return knownBrackets[i]
      }
      if (players < knownBrackets[i]) {
        return knownBrackets[i];
      }
    }
    return -1;
  }
  shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  RRBracketUpdate(obj:{groups:Group[], matches:Match[]}){
    this.groups = obj.groups;
    this.matches = obj.matches;
    this.loadFinalStage(obj.matches);
    this.groupHelper.saveGroups(this.gameName, this.gameType, this.groups);
    this.rrhelper.saveRRGame(this.gameName, this.gameType, this.matches);
    this.saveCache();
  }
  loadFinalStage(matches:Match[]){
    let finishedGroups:Group[] = []
    this.groups.forEach(group=>{
      let allFinished = true;
      let groupGames = matches.filter(m=>{return m.groupName == group.groupName})
      groupGames.forEach(game=>{
        if(game.Gyoztes== ""){
          allFinished = false;
        }
      })
      if(allFinished == true){
        finishedGroups.push(group)
      }
    })
    if(finishedGroups.length > 0){
      this.groupHelper.loadFinalStage(finishedGroups, this.gameName, this.gameType);
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub:Subscription) => {
      sub.unsubscribe();
    });
  }
}
