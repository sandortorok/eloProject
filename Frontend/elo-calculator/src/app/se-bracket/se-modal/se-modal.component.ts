import { DataService, Player, Team } from '../../services/data.service';
import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './se-modal.component.html',
    styleUrls: ['./se-modal.component.scss']
})
export class NgbdModalContent {
    @Input() player1;
    @Input() player2;
    @Input() score1;
    @Input() score2;


    selPlayer="Választott Csapat"
    playerSelected:boolean = false
    constructor(public activeModal: NgbActiveModal) {
    }
    onSelect(name: string){

    }
}