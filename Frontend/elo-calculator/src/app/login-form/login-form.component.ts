import { Component, EventEmitter, OnInit, Output } from '@angular/core';

enum Privilege {
  Admin,
  Normal,
  Guest
}
export interface User{
  username:string;
  password:string;
  privilegeType:Privilege //admin,normal,guest
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  usernameError:boolean = false;
  usernameErrorMessage:string = "";
  username= "";
  passwordError:boolean = false;
  passwordErrorMessage:string = "";
  password="";
  loading = false;
  @Output() loginEvent = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
  }
  usernameKeydown(){
    if(this.username == ""){
      this.usernameError = true;
      this.usernameErrorMessage = "Username is required"
    }
    else{
      this.usernameError = false;
    }
  }
  passwordKeydown(){
    if(this.password == ""){
      this.passwordError = true;
      this.passwordErrorMessage = "Password is required"
    }
    else{
      this.passwordError = false;
    }
  }
  login(){
    this.loading = true;
    setTimeout(() => {
      if(this.username == 'sanyi' && this.password == 'jelszo'){
        this.usernameError = false;
        this.passwordError = false;
        this.loginEvent.emit({username:this.username, password: this.password, privilegeType: Privilege.Admin})
      }
      else{
        this.usernameError = true;
        this.usernameErrorMessage = "Wrong username or password"
        this.passwordError = true;
        this.passwordErrorMessage = "Wrong username or password"
      }
      this.loading = false;
    }, 2000);
  }
  guestLogin(){
    console.log(this.username, this.password);
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

}
