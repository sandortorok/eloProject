import { Group } from './../services/data.service';
import { GroupGeneratorService } from './group-generator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-bracket',
  templateUrl: './group-bracket.component.html',
  styleUrls: ['./group-bracket.component.scss'],
})
export class GroupBracketComponent implements OnInit {
  groups:Group[]
  constructor(private generator: GroupGeneratorService) { }

  ngOnInit(): void {
    this.generator.startGenerating('example');
    this.groups = [];
    this.generator.generated.subscribe(()=>{
      this.groups = this.generator.GeneratedGroups;
    })
  }
  onNewGroup(){

  }
  onLoad(){

  }
  onSave(){
    
  }
  onNext(){
    
  }
  onPrintClick(){
    window.print();
  }
}
