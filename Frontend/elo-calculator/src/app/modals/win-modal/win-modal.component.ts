import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Match } from "src/app/services/data.service";

@Component({
    selector: 'app-win-modal',
    templateUrl: './win-modal.component.html',
    styleUrls: ['./win-modal.component.scss']
})
export class WinModal {
    @Output() updateEvent = new EventEmitter<Match>();
    @Input() match: Match;
    score1:number = 0;
    score2:number = 0;
    selPlayer = "Győztes"
    playerSelected: boolean = false;
    clicked:number = 0;
    bracketType:string = 'single-elimination'; 
    constructor(public activeModal: NgbActiveModal) { }
    onSelect(name: string) {
      this.selPlayer = name;
      this.playerSelected = true;
    }
    updateWinner() {
      if (this.selPlayer == "Győztes") return;
      if (this.clicked > 0) return;
      if (this.score1 > 100 || this.score2 > 100 || this.score1 < 0 || this.score2 < 0) return;
      if (this.selPlayer == 'draw'){
        if (this.score1 != this.score2) return;
          this.match.Gyoztes = 'draw';
          if(this.score1 == 0){
            this.match.score0 = 0.5;
            this.match.score1 = 0.5;
          }
          else{
            this.match.score0 = this.score1
            this.match.score1 = this.score2
          }
          this.updateEvent.emit(this.match);
          this.activeModal.close();
          this.clicked++;
          return;
      }
      let p1 = this.match.Csapatok[0];
      let p2 = this.match.Csapatok[1];
      if(this.selPlayer == p1 && this.score2 > this.score1) return;
      if(this.selPlayer == p2 && this.score2 < this.score1) return;
      if(this.score1 == 0 && this.score2 == 0) {
        if(this.match.Csapatok[0] == this.selPlayer){
          this.match.score0 = 1;
          this.match.score1 = 0
        }
        else if(this.match.Csapatok[1] == this.selPlayer){
          this.match.score0 = 0;
          this.match.score1 = 1;
        }
      }
      else {
        this.match.score0 = this.score1;
        this.match.score1 = this.score2;
      }
      this.match.Gyoztes = this.selPlayer;
      this.updateEvent.emit(this.match);
      this.activeModal.close();
      this.clicked++;
    }
}