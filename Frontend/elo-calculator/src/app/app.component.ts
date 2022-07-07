import { User, UserService } from './services/user-service.service';
import { Component } from '@angular/core';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'elo-calculator';
  navigator:NgbNav;
  constructor(private userservice: UserService){

  }
  login(user: User){
    this.userservice.loggedUser = user
    this.userservice.userChanged.emit();
  }
  logout(){
    // this.userservice.loggedUser = undefined;
  }
}
