import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/services/data.service';

@Component({
  selector: 'app-group-navigator',
  templateUrl: './group-navigator.component.html',
  styleUrls: ['./group-navigator.component.scss']
})
export class GroupNavigatorComponent implements OnInit {
  groups:Group[] = [];
  @Input() gameType;
  constructor() { }

  ngOnInit(): void {
  }
  groupChangeEvent(groups:Group[]){
    this.groups = groups;
  }
  afterScoreUpdate(groups:Group[]){
    this.groups = groups;
  }
}
