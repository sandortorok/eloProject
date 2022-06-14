import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-neon-button',
  templateUrl: './neon-button.component.html',
  styleUrls: ['./neon-button.component.scss']
})
export class NeonButtonComponent implements OnInit {
  @Input() text: string = ""
  constructor() { }

  ngOnInit(): void {
  }

}
