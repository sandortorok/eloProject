import { DataService } from './../../services/data.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { Group, Match } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-load-modal',
  templateUrl: './load-modal.component.html',
  styleUrls: ['./load-modal.component.scss']
})
export class LoadModal implements OnInit {
  names: Array<string> = []
  selGame = "Bajnokság neve"
  gameSelected = false;
  gameType: string;
  loadMode = "single-elimination"
  @Output() loadEvent = new EventEmitter<Object>();
  @Output() loadGroupEvent = new EventEmitter<Object>();
  constructor(public activeModal: NgbActiveModal, private httpservice: HttpService, private dataservice: DataService) {    }
  load() {
    if (this.selGame == "Bajnokság neve") return;
    let matches: Match[] = [];
    switch(this.loadMode){
      case 'single-elimination':
        this.loadMatches(this.httpservice.getSEMatch(this.selGame))
        break;
      case 'double-elimination':
        this.loadMatches(this.httpservice.getDEMatch(this.selGame))
        break;
      case 'round-robin':
        this.loadMatches(this.httpservice.getRRMatch(this.selGame))
        break;
      case 'swiss':
        this.loadMatches(this.httpservice.getSWMatch(this.selGame))
        break;
      case 'group-stage':
        this.loadGroupEvent.emit({name: this.selGame})
        break;
    }

    this.activeModal.close();
  }
  onSelect(n:string){
    this.selGame = n;
    this.gameSelected = true;
  }
  ngOnInit(): void {
    if(this.loadMode == 'single-elimination'){
      this.loadNames(this.httpservice.getSEMatches());
    }
    if(this.loadMode == 'double-elimination'){
      this.loadNames(this.httpservice.getDEMatches());
    }
    if(this.loadMode == 'round-robin'){
      this.loadNames(this.httpservice.getRRMatches());
    }
    if(this.loadMode == 'group-stage'){
      this.loadNames(this.httpservice.getGroupStages());
    }
    if(this.loadMode == 'swiss'){
      this.loadNames(this.httpservice.getSWMatches());
    }
  }
  loadNames(observable: Observable<Object>){
    observable.subscribe(data =>{
      let myarray = Object.values(data);
      myarray.forEach(el =>{
        if (!this.names.includes(el.gameName) && el.gameType == this.gameType){
          if(el.groupMode == undefined || el.groupMode == 0){
            this.names.push(el.gameName);
          }
        }
      })
    })
  }
  loadMatches(observable:Observable<Object>){
    observable.subscribe(data =>{
      let matches = this.dataservice.loadMatchesFromDataObject(data);
      this.loadEvent.emit({matches:matches, name: this.selGame})
    })
  }
  loadGames(){

  }

}
