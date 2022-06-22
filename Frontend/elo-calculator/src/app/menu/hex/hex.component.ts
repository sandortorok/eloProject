import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-hex',
  templateUrl: './hex.component.html',
  styleUrls: ['./hex.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HexComponent implements OnInit {
  @Input() icon = "";
  @Input() text = "";
  constructor() { }

  ngOnInit(): void {
  }

}
