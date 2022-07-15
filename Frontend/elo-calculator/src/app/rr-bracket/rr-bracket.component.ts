import { User, UserService } from './../services/user-service.service';
import { RRHelperService } from './rr-helper.service';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadModal } from '../modals/load-modal/load-modal.component';
import { WinModal } from '../modals/win-modal/win-modal.component';
import { NewModal } from '../modals/new-modal/new-modal.component';
import { SaveModal } from '../modals/save-modal/save-modal.component';
import { Group, Match } from '../services/data.service';
import { RRGeneratorService } from './rr-generator.service';
import { Subscription } from 'rxjs/internal/Subscription';


export interface playerScore{
  name:string,
  wins:number,
  loses:number,
  draws:number
}
@Component({
  selector: 'app-rr-bracket',
  templateUrl: './rr-bracket.component.html',
  styleUrls: ['./rr-bracket.component.scss']
})
export class RRBracketComponent implements OnInit {
  user:User;
  @ViewChild('container') container;
  @Input() matches: Match[];
  ngOnChanges(changes: SimpleChanges) {
    if(changes['matches'] != undefined){
      this.giveEffects();
    }
  }
  @Input() gameType:string;
  gameName:string = "";
  players:playerScore[] = [];

  //GROUP STUFF
  @Input() groupMode:boolean = false;
  @Input() groups:Group[] = [];
  @Output() groupsChange = new EventEmitter<{groups: Group[], matches: Match[]}>();
  
  private subscriptions: Array<Subscription> = [];

  //GROUP STUFF END
  constructor(private bracket: RRGeneratorService, private modalService: NgbModal, private rrhelper: RRHelperService, private userservice:UserService) { }
  ngOnInit(): void {
    this.subscriptions.push(this.sub2UserChange());
    this.user = this.userservice.loggedUser;
    if(!this.groupMode){ //HA RENDES ÜZEMMMÓDBAN VAN
      this.subscriptions.push(this.sub2Generated());
      this.subscriptions.push(this.sub2Load());
      this.loadCache();
    }
    else{ //HA CSOPORTOS ÜZENMÓDBAN VAN AKKOR INPUT-KÉNT KAPJA A MECCSEKET
      this.giveEffects();
    }
  }
  giveEffects(){
    setTimeout(() => {
      if (this.container != undefined){
        this.giveHoverEffect();
        this.giveCurrentClass();
      }
    });
  }
  giveCurrentClass() {
    let matchups = this.container.nativeElement.querySelectorAll('ul');
    matchups.forEach(m => {
      if(m.innerHTML.includes('win') || m.innerHTML.includes('draw')){
        m.classList.remove('current');
      }
      else{
        m.classList.add('current');
      }
    });
  }
  giveHoverEffect() {
    let teamElements = this.container.nativeElement.querySelectorAll('li.team');
    this.rrhelper.giveHoverEffect(teamElements, this.matches)
  }
  onTeamClick(event){
    if(this.user.privilegeType=='Guest') return;
    let matchID = event.target.parentNode.id.match(/(\d+)/)![0];
    let thisMatch = this.matches.filter(m =>{ return m.Meccs_id == matchID})[0];
    if (!thisMatch) return;
    if(thisMatch.Gyoztes != "") return;
    if (thisMatch.Csapatok[0] == "" || thisMatch.Csapatok![1] == "") return;
    const modalRef = this.modalService.open(WinModal, { centered: true });
    modalRef.componentInstance.match = thisMatch;
    modalRef.componentInstance.updateEvent.subscribe((updatedMatch:Match)=>{
      thisMatch = updatedMatch;
      if(!this.groupMode){
        this.rrhelper.saveRRGame(this.gameName, this.gameType, this.matches);
        this.saveCache();
      }
      else{//HA CSOPORTOS JÁTÉK VAN
        this.updateGroups(updatedMatch);
        this.groupsChange.emit({groups: this.groups, matches:this.matches});
      }
      this.loadPlayerStats();
      this.giveEffects();
    })
  }
  updateGroups(updatedMatch:Match){
    this.groups = this.rrhelper.updateGroups(this.groups, updatedMatch)
  }
  loadPlayerStats(){
    this.players = this.rrhelper.loadPlayerStats(this.matches)
  }
  saveCache(){
    this.rrhelper.saveCache(this.gameName, this.gameType);
  }
  saveGroupCache(){
    this.rrhelper.saveGroupCache(this.gameName, this.gameType);
  }
  loadCache(){
    this.rrhelper.loadCache(this.gameType);
  }
  sub2Generated(){
    return this.bracket.generated.subscribe((newMatches)=>{
        this.matches = newMatches;
        this.gameName = Math.random().toString(36).slice(2, 7);
        this.rrhelper.saveRRGame(this.gameName, this.gameType, this.matches);
        this.saveCache();
        this.loadPlayerStats();
        this.giveEffects();
    })
  }
  sub2Load(){
    return this.rrhelper.matchesLoaded.subscribe(obj=>{
      this.matches = obj.matches;
      this.gameName = obj.gameName;
      this.loadPlayerStats();
      this.giveEffects();
    })
  }
  sub2UserChange(){
    return this.userservice.userChanged.subscribe(()=>{
      this.user = this.userservice.loggedUser
    });
  }
  onNewBracket(){
    if(this.groupMode){
      this.bracket.generateGroupMatches(this.groups);
    }
    else{      
      const modalRef = this.modalService.open(NewModal, { centered: true });
      modalRef.componentInstance.generateEvent.subscribe((obj)=>{
        this.matches = [];
        this.bracket.startGenerating('withNames', obj.players);
      })
    }
  }
  onLoad(){
    const modalRef = this.modalService.open(LoadModal, { centered: true });
    modalRef.componentInstance.matches = this.matches;
    modalRef.componentInstance.loadMode = 'round-robin';
    modalRef.componentInstance.gameType = this.gameType;
    modalRef.componentInstance.loadEvent.subscribe((loadData)=>{
      this.gameName = loadData.name
      this.matches = []
      //kell idő amíg felfogja hogy a newMatches nem üres.......
      setTimeout(() => {
        this.matches = []
        this.matches = loadData.matches;
        this.loadPlayerStats();
        this.saveCache();
        this.giveEffects();
      }, 1000);
      //meg kell várni míg renderel a view
    })
  }
  onSave(){
    if(this.matches == undefined) return;
    if(this.matches.length < 1) return;
    const modalRef = this.modalService.open(SaveModal, { centered: true });
    modalRef.componentInstance.matches = this.matches;
    modalRef.componentInstance.saveMode = 'round-robin';
    modalRef.componentInstance.gameType = this.gameType;
    if(this.gameName != '') modalRef.componentInstance.IN_gameID = this.gameName;
    modalRef.componentInstance.saveEvent.subscribe(name=>{
      this.gameName = name;
      this.saveCache();
    })
  }
  onPrintClick(){
    window.print();
  }
  ngOnDestroy(){
    this.subscriptions.forEach((sub:Subscription) => {
      sub.unsubscribe();
    });  
  }
}
