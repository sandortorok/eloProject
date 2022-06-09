import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbdModalContent } from '../modal/modal.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Input() name;
  @Output() nameChange = new EventEmitter<string>();
  @Input() score = 0;
  @Output() scoreChange = new EventEmitter<number>();
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  onTeamClick(event){
    const target = event.target as HTMLLIElement
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.target = target;
  }
}
