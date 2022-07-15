import { HttpService } from 'src/app/services/http.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User, Privilege } from '../services/user-service.service';

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

  constructor(private httpservice:HttpService) { }

  ngOnInit(): void {
  }
  userFocusCheck(){
    if(this.username == ""){
      this.usernameError = true;
      this.usernameErrorMessage = "Felhasználónév kitöltése szükséges"
    }
    else{
      this.usernameError = false;
    }
  }
  userKeydownCheck(key:KeyboardEvent){
    if (key.key=='Enter') return;
    setTimeout(() => { //need to wait a little or username doesn't update
      if(this.username != ""){
        this.usernameError = false;
      }
    });
  }
  passFocusCheck(){
    if(this.password == ""){
      this.passwordError = true;
      this.passwordErrorMessage = "Jelszó kitöltése szükséges"
    }
    else{
      this.passwordError = false;
    }
  }
  passKeydownCheck(){
    setTimeout(() => {
      if(this.password != ""){
        this.passwordError = false;
      }
    });
  }
  login(){
    if(this.username == ""){
      this.userFocusCheck();
      return;
    }
    if(this.password == ""){
      this.passFocusCheck();
      return;
    }
    this.loading = true;
    this.httpservice.getUser(this.username).subscribe(response=>{
      let myarray = Object.values(response);
      if(myarray.length == 0){
        this.validationFailed();
      }
      else{
        let responseUser = myarray[0]
        if(responseUser.password == this.password){
          console.log({username:responseUser.displayName, privilegeType:responseUser.privilegeType});
          this.loginEvent.emit({username:responseUser.displayName, privilegeType:responseUser.privilegeType})
        }
        else{
          this.validationFailed();
        }
      }
    })
  }
  guestLogin(){
    this.loginEvent.emit({username:'Guest', privilegeType: Privilege.Admin})
  }
  validationFailed(){
    this.usernameError = true;
    this.usernameErrorMessage = "Rossz felhasználónév vagy jelszó"
    this.passwordError = true;
    this.passwordErrorMessage = "Rossz felhasználónév vagy jelszó"
    this.loading = false;
  }
}
