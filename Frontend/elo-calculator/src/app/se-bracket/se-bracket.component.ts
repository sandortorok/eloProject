import { SEGeneratorService } from '../services/se-generator.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../bracket/modal/modal.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-se-bracket',
  templateUrl: './se-bracket.component.html',
  styleUrls: ['./se-bracket.component.scss']
})
export class SEBracketComponent implements OnInit {
  @ViewChild('container') container; 
  matches;
  players;
  playerElements: any[] = []
  rounds:Array<any> = [];
  rounds2:Array<any> = [];
  semi1:any = {};
  semi2:any = {};
  final:any = {};
  
  team32 = false;
  constructor(private bracket: SEGeneratorService, private modalService: NgbModal) {
    this.matches = bracket.GeneratedGames;
    this.players = bracket.players;
    if (this.matches.length > 30){
      this.team32=true;
    }
    for(let i = 0; i < 7; i++){
      let newRound = this.matches.filter(el=>{return el.Round == (i+1)});
      if (newRound.length == 2 && this.team32){
        this.semi1 = newRound[0]
        this.semi2 = newRound[1]
      }
      else if (newRound.length == 1 && this.team32){
        this.final = newRound[0]
      }
      else if(newRound.length > 0){
        if (this.team32){
          let newRound2 = newRound.splice(newRound.length/2, newRound.length)
          this.rounds2.push(newRound2)
        }
        this.rounds.push(newRound)
      }
    }
  }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.giveHoverEffect();
    this.giveCurrentClass();
  }
  sortPlayerElements(){
    this.playerElements.forEach(samePlayers=>{
      samePlayers.sort((a, b)=>{
        let round_numA = a.parentElement.parentElement.classList[1].replace(/\D/g, '');
        let round_numB = b.parentElement.parentElement.classList[1].replace(/\D/g, '');
        return parseInt(round_numB) - parseInt(round_numA);
      })
    })
  }
  giveCurrentClass(){
    this.sortPlayerElements();
    this.playerElements.forEach(arr=>{
      arr.forEach((el, index) => {
        if(index == 0){
          el.classList.add('current')
        }
        else{
          el.classList.remove('current')
        }
      });
    })
  }
  giveHoverEffect(){
    let teamElements = this.container.nativeElement.querySelectorAll('li.team');
    teamElements.forEach(el => {
      if (el.onmouseover!=null) el.onmouseover = null;
      if (el.onmouseleave!=null) el.onmouseleave = null;
    });
    this.players.forEach(playerName => {
      let samePlayer:any[] = []
      teamElements.forEach(el => {
        if (el.innerText.split('\n')[0] == playerName){
          samePlayer.push(el)
        }
      });
      samePlayer.forEach(e =>{
        e.onmouseover = ()=>{
          samePlayer.forEach(same=>{
            same.style.border = "2px solid #2c7399";
            same.style.opacity = 1;
          })
        }
        e.onmouseleave= () =>{
          samePlayer.forEach(same=>{
            same.style.border = "";
            same.style.opacity = "";
          })
        }
      })
      this.playerElements.push(samePlayer)
    });
  }

  onTeamClick(event){
    const target = event.target as HTMLLIElement
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.target = target.parentElement;
  }
}
