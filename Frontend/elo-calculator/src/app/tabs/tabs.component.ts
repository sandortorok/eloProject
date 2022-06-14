import { Component, OnInit } from '@angular/core';
import { SEGeneratorService } from '../se-bracket/se-generator.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor(a: SEGeneratorService) { }

  ngOnInit(): void {
  }

}
