import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './se-modal.component.html',
    styleUrls: ['./se-modal.component.scss']
})
export class SEModal {
    @Input() player1: string;
    @Input() player2: string;
    @Output() updateEvent = new EventEmitter<{winner: string, player1: string, player2: string,score0?: number, score1?: number}>();

    score1 = null;
    score2 = null;
    selPlayer = "Győztes"
    playerSelected: boolean = false
    constructor(public activeModal: NgbActiveModal) {    }
    onSelect(name: string) {
        this.selPlayer = name;
        this.playerSelected = true;
        this.updateEvent.emit({winner:name, player1: this.player1, player2: this.player2})
    }
}