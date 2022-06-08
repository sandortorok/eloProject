import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {
  @Input() mynav;
  constructor() { }

  ngOnInit(): void {
  }
  goHome(){
    this.mynav.select(0);
  }
}
