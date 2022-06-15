import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-se-new-modal',
  templateUrl: './se-new-modal.component.html',
  styleUrls: ['./se-new-modal.component.scss']
})
export class SENewModal implements OnInit {
  constructor(public activeModal: NgbActiveModal) {    }

  ngOnInit(): void {
  }

}
