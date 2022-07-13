import { HttpService } from '../../services/http.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Group, Match } from 'src/app/services/data.service';

@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.scss']
})
export class SaveModal implements OnInit {
  IN_gameID:string;
  gameType:string;
  @Output() saveEvent = new EventEmitter<string>();

  matches:Match[]; // or groups
  groups:Group[];
  placeholder:string = "Bajnokság neve";
  saveMode:string = "single-elimination";
  constructor(public activeModal: NgbActiveModal, private httpservice: HttpService) {    }
  save() {
    if (this.IN_gameID.length < 5) return; 
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
    if(this.saveMode == 'group-stage'){
      this.httpservice.getGroupStageNames()
      .subscribe(names =>{
        this.saveEvent.emit(this.IN_gameID);//EZT A NAVIGATOR-BAN MENTJÜK EL
        this.activeModal.close()

      })
    }
    if(this.saveMode == 'swiss'){
      this.httpservice.getSWMatchNames()
      .subscribe(names =>{
        this.httpservice.saveSWGame({body: this.matches, name: this.IN_gameID, type: this.gameType}).subscribe(()=>{
          this.saveEvent.emit(this.IN_gameID);
          this.activeModal.close();
        })
      })
    }
  }
  ngOnInit(): void {
  }

}
