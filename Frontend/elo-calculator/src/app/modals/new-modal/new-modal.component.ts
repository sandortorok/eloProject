import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-modal',
  templateUrl: './new-modal.component.html',
  styleUrls: ['./new-modal.component.scss']
})
export class NewModal {
  playerInput: string = "";
  players:string[] = [];
  numInput: number = 1;
  qualifyNumber:number = 2;
  groupSize:number = 4;
  groupMode:boolean = false;
  @Output() generateEvent = new EventEmitter<{players: string[], qualifyNumber?: number, groupSize?:number}>();
  @ViewChild('list') private scrollUL: ElementRef;

  scrollToBottom(): void {
    try {
        this.scrollUL.nativeElement.scrollTop = this.scrollUL.nativeElement.scrollHeight;
    } catch(err) {
      console.log(err);
    }                 
  }
  constructor(public activeModal: NgbActiveModal) {}
  addPlayer(){
    if (this.playerInput == "") return;
    if (this.players.includes(this.playerInput)) return;
    if (this.players.length == 64) return;
    this.players.push(this.playerInput);
    setTimeout(() => {
      this.scrollToBottom()      
    }, 10);
    this.playerInput = "";
  }
  generateRandom(){
    if (this.numInput > 64) return;
    if (this.numInput < 1) return;
    let randPlayers:string[] = [];
    for (let i = 0; i < this.numInput;i++){
      randPlayers.push(`Játékos ${i+1}`);
    }
    this.shuffle(randPlayers)
    this.generateEvent.emit({
      players: randPlayers,
      qualifyNumber:this.qualifyNumber,
      groupSize:this.groupSize
    });
    this.activeModal.close();
  }
  generateCustom(){
    this.shuffle(this.players)
    this.generateEvent.emit({
      players: this.players,
      qualifyNumber: this.qualifyNumber,
      groupSize: this.groupSize
    });
    this.activeModal.close();
  }
  //COPY PASTE FROM STACK OVERFLOW
  shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
}
