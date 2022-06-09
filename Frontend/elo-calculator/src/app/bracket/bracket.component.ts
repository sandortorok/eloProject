import { DataService, Team } from './../services/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbdModalContent } from './modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {
  @Input() mynav;
  teams:Team[] = [];

  constructor(private dataservice: DataService, private modalService: NgbModal) {
    this.teams = this.dataservice.volleyBallTeams;
  }

  ngOnInit(): void {
  }
  goHome(){
    this.mynav.select(0);
  }

}
