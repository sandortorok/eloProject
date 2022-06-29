import { HttpService } from './../../services/http.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-se-save-modal',
  templateUrl: './se-save-modal.component.html',
  styleUrls: ['./se-save-modal.component.scss']
})
export class SESaveModal implements OnInit {
  IN_gameID:string;
  gameType:string;
  @Output() saveEvent = new EventEmitter<string>();

  matches;
  placeholder:string = "Bajnokság neve";
  saveMode:string = "single-elimination";
  constructor(public activeModal: NgbActiveModal, private httpservice: HttpService) {    }
  save() {
    if (this.IN_gameID.length < 5) return; 
    if (this.IN_gameID == "NÉVTELEN") return;
    if (this.matches == undefined) return;

    if(this.saveMode == 'single-elimination'){
      this.httpservice.getSEMatchNames()
      .subscribe(names =>{
        this.httpservice.saveSEGame({body: this.matches, name: this.IN_gameID, type: this.gameType}).subscribe(()=>{
          this.saveEvent.emit(this.IN_gameID);
          this.activeModal.close();
        });
      })
    }
    if(this.saveMode == 'double-elimination'){
      this.httpservice.getDEMatchNames()
      .subscribe(names =>{
        this.httpservice.saveDEGame({body: this.matches, name: this.IN_gameID, type: this.gameType}).subscribe(()=>{
          this.saveEvent.emit(this.IN_gameID);
          this.activeModal.close()
        });
      })
    }
    if(this.saveMode == 'round-robin'){
      this.httpservice.getRRMatchNames()
      .subscribe(names =>{
        this.httpservice.saveRRGame({body: this.matches, name: this.IN_gameID, type: this.gameType}).subscribe(()=>{
          this.saveEvent.emit(this.IN_gameID);
          this.activeModal.close()
        });
      })
    }

  }
  ngOnInit(): void {
  }

}
