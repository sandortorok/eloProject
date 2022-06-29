import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Match } from "src/app/services/data.service";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './se-modal.component.html',
    styleUrls: ['./se-modal.component.scss']
})
export class SEModal {
    @Output() updateEvent = new EventEmitter<Match>();
    @Input() match: Match;
    score1 = null;
    score2 = null;
    selPlayer = "Győztes"
    playerSelected: boolean = false
    constructor(public activeModal: NgbActiveModal) { }
    onSelect(name: string) {
      this.selPlayer = name;
      this.playerSelected = true;
    }
    updateWinner() {
      if (this.selPlayer == "Győztes") return;
      this.match.Gyoztes = this.selPlayer;
      this.updateEvent.emit(this.match)
      this.activeModal.close()
    }
}