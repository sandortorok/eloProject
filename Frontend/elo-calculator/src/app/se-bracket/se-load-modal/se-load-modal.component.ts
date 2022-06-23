import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';
import { Match } from '../se-generator.service';

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
        let newMatch:Match = {};
        newMatch['Csapatok'] = [match.player1, match.player2]
        newMatch['Gyoztes'] = match.winner
        newMatch['bye'] = match.bye
        newMatch['Meccs_id'] = match.match_ID
        newMatch['nextRoundID'] = match.nextMatch_ID
        newMatch['bottom'] = match.bottom
        newMatch['score0'] = match.score1
        newMatch['score1'] = match.score2
        newMatch['Round'] = match.round
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
        let newMatch:Match = {};
        newMatch['Csapatok'] = [match.player1, match.player2]
        newMatch['Gyoztes'] = match.winner
        newMatch['bye'] = match.bye
        newMatch['Meccs_id'] = match.match_ID
        newMatch['nextRoundID'] = match.nextMatch_ID
        newMatch['bottom'] = match.bottom
        newMatch['score0'] = match.score1
        newMatch['score1'] = match.score2
        newMatch['Round'] = match.round
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
