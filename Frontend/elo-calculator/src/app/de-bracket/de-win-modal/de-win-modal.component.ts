import { Match } from './../../se-bracket/se-generator.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-de-win-modal',
  templateUrl: './de-win-modal.component.html',
  styleUrls: ['./de-win-modal.component.scss']
})
export class DEWinModal {
  @Output() updateEvent = new EventEmitter<Match>();
  @Input() match: Match;
  score1 = null;
  score2 = null;
  selPlayer = "Győztes"
  playerSelected: boolean = false
  constructor(public activeModal: NgbActiveModal) {    }
  onSelect(name: string) {
      this.selPlayer = name;
      this.playerSelected = true;
    }
    updateWinner(){
      if(this.selPlayer == "Győztes") return;
      this.match.Gyoztes = this.selPlayer;
      this.updateEvent.emit(this.match)
      this.activeModal.close()
  }
}
