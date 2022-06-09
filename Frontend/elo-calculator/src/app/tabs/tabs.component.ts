import { Component, OnInit } from '@angular/core';
import { SingleEliminationGeneratorService } from '../services/single-elimination-generator.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor(a: SingleEliminationGeneratorService) { }

  ngOnInit(): void {
  }

}
