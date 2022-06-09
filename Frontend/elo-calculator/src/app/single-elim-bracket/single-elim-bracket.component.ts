import { SingleEliminationGeneratorService } from './../services/single-elimination-generator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-elim-bracket',
  templateUrl: './single-elim-bracket.component.html',
  styleUrls: ['./single-elim-bracket.component.scss']
})
export class SingleElimBracketComponent implements OnInit {
  matches;
  rounds:Array<any> = [];
  rounds2:Array<any> = [];
  
  semi1:any = {};
  semi2:any = {};
  final:any = {};
  
  team32 = false;
  constructor(private bracket: SingleEliminationGeneratorService) {
    this.matches = bracket.GeneratedGames;
    if (this.matches.length > 30){
      this.team32=true;
    }
    for(let i = 0; i < 6; i++){
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

}
