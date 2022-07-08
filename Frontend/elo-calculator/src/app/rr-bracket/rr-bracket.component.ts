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
    if(!this.groupMode){ //HA RENDES ÜZEMMMÓDBAN VAN
      this.user = this.userservice.loggedUser;
      this.subscriptions.push(this.sub2UserChange());
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
      if(!m.innerHTML.includes('win')){
        m.classList.add('current');
      }
      else{
        m.classList.remove('current')
      }
    });
  }
  giveHoverEffect() {
    let teamElements = this.container.nativeElement.querySelectorAll('li.team');
    teamElements.forEach(el => {
      if (el.onmouseover != null) el.onmouseover = null;
      if (el.onmouseleave != null) el.onmouseleave = null;
    });
    let players:string[] = []
    this.matches.forEach(match=>{
      let p1 = match.Csapatok[0];
      let p2 = match.Csapatok[1];
      if(p1 != "" && !players.includes(p1)){
        players.push(p1);
      }
      if(p2 != "" && !players.includes(p2)){
        players.push(p2);
      }
    })
    players.forEach(playerName => {
      let samePlayer: any[] = []
      teamElements.forEach(el => {
        if (el.firstChild.textContent.trim() == playerName) {
          samePlayer.push(el)
        }
      });
      samePlayer.forEach(e => {
        e.onmouseover = () => {
          samePlayer.forEach(same => {
            same.style.border = "1px solid rgb(71, 228, 9)";
            same.style.opacity = 1;
            same.style.boxShadow = "0 0 5px rgb(71, 228, 9), 0 0 25px rgb(71, 228, 9)"
          })
        }
        e.onmouseleave = () => {
          samePlayer.forEach(same => {
            same.style.border = "";
            same.style.opacity = "";
            same.style.boxShadow = ""

          })
        }
      })
    });
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
      let nextID = thisMatch.nextRoundID
      if(nextID >= 0){
        let nextMatch:Match = this.matches.filter(m=>{return m.Meccs_id == nextID})[0]
        nextMatch.Csapatok[thisMatch.bottom] = thisMatch.Gyoztes;
      }
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
    let p1 = updatedMatch.Csapatok[0];
    let p2 = updatedMatch.Csapatok[1];
    let winner = updatedMatch.Gyoztes;
    let diff = 0;
    if(updatedMatch.score0!=null && updatedMatch.score1!=null){
      diff = Math.abs(updatedMatch.score0-updatedMatch.score1);
    }
    this.groups.forEach(group=>{
      group.teams.forEach(team=>{
        if(team.name == p1 || team.name == p2){
          if(team.name == winner){
            team.wins+=1;
            team.points+=3;
            team.last3Results.unshift('W');
            team.diff += diff
            if(team.last3Results.length > 3){
              team.last3Results.pop();
            }
          }
          else{
            team.loses+=1;
            team.diff -= diff
            team.last3Results.unshift('L');
            if(team.last3Results.length > 3){
              team.last3Results.pop();
            }
          }
        }
      })
    })
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
        this.rrhelper.saveRRGame(this.gameName, this.gameType, this.matches, this.groupMode);
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
