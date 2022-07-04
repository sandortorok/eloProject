import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(public activeModal: NgbActiveModal, private httpservice: HttpService) {    }
  load() {
    if (this.selGame == "Bajnokság neve") return;
    let matches: Match[] = [];
    switch(this.loadMode){
      case 'single-elimination':
        this.httpservice.getSEMatch(this.selGame).subscribe(data=>{
          let myarray = Object.values(data);
          myarray.forEach((match)=>{
            let newMatch:Match = {
              Csapatok: [match.player1, match.player2],
              Round: match.round,
              nextRoundID: match.nextMatch_ID,
              Gyoztes: match.winner,
              Meccs_id: match.match_ID,
              bye: match.bye,
              bottom: match.bottom
            };
            newMatch['score0'] = match.score1
            newMatch['score1'] = match.score2
            matches.push(newMatch);
          })
          this.loadEvent.emit({matches:matches, name: this.selGame})
        });
        break;
      case 'double-elimination':
        this.httpservice.getDEMatch(this.selGame).subscribe(data=>{
          let myarray = Object.values(data);
          myarray.forEach((match)=>{
            let newMatch:Match = {
              Csapatok: [match.player1, match.player2],
              Round: match.round,
              nextRoundID: match.nextMatch_ID,
              Gyoztes: match.winner,
              Meccs_id: match.match_ID,
              bye: match.bye,
              bottom: match.bottom
            };
            newMatch['score0'] = match.score1
            newMatch['score1'] = match.score2
            newMatch['final'] = match.final
            newMatch['loser'] = match.loser
            matches.push(newMatch);
          })
          this.loadEvent.emit({matches:matches, name: this.selGame})
        });
        break;
      case 'round-robin':
        this.httpservice.getRRMatch(this.selGame).subscribe(data=>{
          let myarray = Object.values(data);
          myarray.forEach((match)=>{
            let newMatch:Match = {
              Csapatok: [match.player1, match.player2],
              Round: match.round,
              nextRoundID: -1,
              Gyoztes: match.winner,
              Meccs_id: match.match_ID,
              bye: match.bye,
              bottom: 0
            };
            matches.push(newMatch);
          })
          this.loadEvent.emit({matches:matches, name: this.selGame})
        });
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
      this.httpservice.getSEMatches()
      .subscribe(data =>{
        let myarray = Object.values(data);
        myarray.forEach(el =>{
          if (!this.names.includes(el.gameName) && el.gameType == this.gameType){
            this.names.push(el.gameName);
          }
        })
      })
    }
    if(this.loadMode == 'double-elimination'){
      this.httpservice.getDEMatches()
      .subscribe(data =>{
        let myarray = Object.values(data);
        console.log(myarray);
        myarray.forEach(el =>{
          if (!this.names.includes(el.gameName) && el.gameType == this.gameType){
            this.names.push(el.gameName);
          }
        })
      })
    }
    if(this.loadMode == 'round-robin'){
      this.httpservice.getRRMatches()
      .subscribe(data =>{
        let myarray = Object.values(data);
        console.log(myarray);
        myarray.forEach(el =>{
          if (!this.names.includes(el.gameName) && el.gameType == this.gameType){
            this.names.push(el.gameName);
          }
        })
      })
    }
    if(this.loadMode == 'group-stage'){
      this.httpservice.getGroupStages()
      .subscribe(data =>{
        let myarray = Object.values(data);
        console.log(myarray);
        myarray.forEach(el =>{
          if (!this.names.includes(el.gameName) && el.gameType == this.gameType){
            this.names.push(el.gameName);
          }
        })
      })
    }
  }
}
