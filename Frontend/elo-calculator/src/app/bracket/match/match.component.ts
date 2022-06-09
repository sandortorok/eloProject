import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  constructor() { }
  @Input() team1;
  @Input() team2;
  score1 = 0;
  score2 = 0;
  ngOnInit(): void {
  }

}
