import { HttpService } from './../../services/http.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-se-save-modal',
  templateUrl: './se-save-modal.component.html',
  styleUrls: ['./se-save-modal.component.scss']
})
export class SESaveModal implements OnInit {
  IN_gameID:string = ""
  matches;
  placeholder:string = "Bajnokság neve";
  saveMode:string = "single-elimination";
  constructor(public activeModal: NgbActiveModal, private httpservice: HttpService) {    }
  save() {
    if (this.IN_gameID.length < 5) return; 
    if (this.IN_gameID == "NÉVTELEN") return;
    this.httpservice.getSEMatchNames()
      .subscribe(names =>{
        console.log(names);
    })
    this.matches['gameName'] = this.IN_gameID;
    this.httpservice.saveSEGame(this.matches).subscribe(()=>{});
    this.IN_gameID = ""
    this.activeModal.close()
  }
  saveDE(){
    if (this.IN_gameID.length < 5) return; 
    if (this.IN_gameID == "NÉVTELEN") return;
    if (this.matches == undefined) return;
    this.httpservice.getDEMatchNames()
      .subscribe(names =>{
        console.log(names);
        this.matches['gameName'] = this.IN_gameID;
        this.httpservice.saveDEGame(this.matches).subscribe(()=>{});
    })
    this.IN_gameID = ""
    this.activeModal.close()
  }
  ngOnInit(): void {
  }

}
