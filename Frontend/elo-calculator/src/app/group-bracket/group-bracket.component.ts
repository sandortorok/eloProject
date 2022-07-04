import { Group } from './../services/data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-group-bracket',
  templateUrl: './group-bracket.component.html',
  styleUrls: ['./group-bracket.component.scss'],
})
export class GroupBracketComponent implements OnInit {
  @Input() groups: Group[];
  @Output() groupChange = new EventEmitter<Group[]>();
  constructor() { }

  ngOnInit(): void {

  }
}
