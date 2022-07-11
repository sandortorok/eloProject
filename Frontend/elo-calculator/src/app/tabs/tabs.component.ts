import { Privilege, User, UserService } from './../services/user-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SEGeneratorService } from '../se-bracket/se-generator.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Output() logoutEvent = new EventEmitter();
  user:User;
  desktopView:boolean = false;

  constructor(private userservice: UserService) { }

  ngOnInit(): void {
    this.userservice.userChanged.subscribe(()=>{
      this.user = this.userservice.loggedUser
    });
  }
  viewChange(){
    this.desktopView = !this.desktopView;
  }
}
