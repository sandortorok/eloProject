import { DataService, Player, Team } from './../../services/data.service';
import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class NgbdModalContent {
    @Input() target: HTMLLIElement;

    teams:Team[] = [];
    selPlayer="Választott Csapat"
    playerSelected:boolean = false
    constructor(public activeModal: NgbActiveModal, private dataservice: DataService) {
        this.teams = dataservice.volleyBallTeams;
    }
    onSelect(name: string){
        this.selPlayer = name
        this.playerSelected = true
        this.target.innerText = name
    }
}