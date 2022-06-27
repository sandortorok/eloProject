import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-neon-button',
  templateUrl: './neon-button.component.html',
  styleUrls: ['./neon-button.component.scss']
})
export class NeonButtonComponent {
  @Input() text: string = ""
  @ViewChild("PRINT") mybutton;
  constructor() { }

  ngAfterViewInit(): void {
    // this.mybutton.nativeElement.style.setProperty('--buttonCLR','red');
  }

}
