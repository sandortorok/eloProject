import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Group, GroupPlayer } from './../services/data.service';
import { GroupGeneratorService } from '../group-navigator/group-generator.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SaveModal } from '../modals/save-modal/save-modal.component';
import { Subscription } from 'rxjs/internal/Subscription';

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
