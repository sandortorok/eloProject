import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Match } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-se-load-modal',
  templateUrl: './se-load-modal.component.html',
  styleUrls: ['./se-load-modal.component.scss']
})
export class SELoadModal implements OnInit {
  names: Array<string> = []
  selGame = "Bajnokság neve"
  gameSelected = false;
  loadMode = "single-elimination"
  @Output() loadEvent = new EventEmitter<Object>();
  
  constructor(public activeModal: NgbActiveModal, private httpservice: HttpService) {    }
  load() {
    if (this.selGame == "Bajnokság neve") return;
    let matches: Match[] = [];
    this.httpservice.getSEMatch(this.selGame).subscribe(data=>{
      let myarray = Object.values(data);
      myarray.forEach((match)=>{
        let newMatch:Match = {
          Csapatok: [match.player1, match.player2],
          Round: match.round,
          nextRoundID: match.nextMatch_ID,
          Gyoztes: match.winner,
          Meccs_id: match.match_ID,
          bye: false,
          bottom: match.bottom
        };
        newMatch['Gyoztes'] = match.winner
        newMatch['bye'] = match.bye
        newMatch['score0'] = match.score1
        newMatch['score1'] = match.score2
        matches.push(newMatch);
      })
      this.loadEvent.emit({matches:matches, name: this.selGame})
    });
    this.activeModal.close();
  }
  loadDE(){
    if (this.selGame == "Bajnokság neve") return;
    let matches: Match[] = [];
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
    this.activeModal.close();
  }
  onSelect(n:string){
    this.selGame = n;
    this.gameSelected = true;
  }
  ngOnInit(): void {
    if(this.loadMode == 'single-elimination'){
      this.httpservice.getSEMatchNames()
      .subscribe(data =>{
        let myarray = Object.values(data);
        myarray.forEach(el =>{
          if (!this.names.includes(el.gameName)){
            this.names.push(el.gameName);
          }
        })
      })
    }
    if(this.loadMode == 'double-elimination'){
      this.httpservice.getDEMatchNames()
      .subscribe(data =>{
        let myarray = Object.values(data);
        myarray.forEach(el =>{
          if (!this.names.includes(el.gameName)){
            this.names.push(el.gameName);
          }
        })
      })
    }
  }
}
