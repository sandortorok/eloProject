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

@Component({
  selector: 'app-group-navigator',
  templateUrl: './group-navigator.component.html',
  styleUrls: ['./group-navigator.component.scss']
})
export class GroupNavigatorComponent implements OnInit {
  groups: Group[];
  matches:Match[];
  @Input() gameType:string;
  gameName: string;
  private subscriptions: Array<Subscription> = [];
  constructor(
    private groupHelper: GroupHelperService, 
    private generator: GroupGeneratorService, 
    private modalService: NgbModal, 
    private rrhelper: RRHelperService,
    private rrGenerator: RRGeneratorService
  ) { }

  ngOnInit(): void {
    this.loadCache();
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
      this.rrhelper.saveRRGame(this.gameName, this.gameType, this.matches, true);
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
        this.rrhelper.loadGroupMatches(this.gameName);
      }
    })
  }
  groupGeneratedSub():Subscription{
    return this.generator.generated.subscribe(() => {
      this.groups = this.generator.GeneratedGroups;
      this.gameName = Math.random().toString(36).slice(2, 7);
      this.matches = this.rrGenerator.generateGroupMatches(this.groups);
      this.rrhelper.saveRRGame(this.gameName, this.gameType, this.matches, true);
      this.groupHelper.saveGroups(this.gameName, this.gameType, this.groups);
      this.saveCache();
    })
  }
  RRBracketUpdate(obj:{groups:Group[], matches:Match[]}){
    this.groups = obj.groups;
    this.matches = obj.matches;
    this.groupHelper.saveGroups(this.gameName, this.gameType, this.groups);
    this.rrhelper.saveRRGame(this.gameName, this.gameType, this.matches, true);
    this.saveCache();
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub:Subscription) => {
      sub.unsubscribe();
    });
  }
}
