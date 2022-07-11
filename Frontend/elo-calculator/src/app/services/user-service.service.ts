import { EventEmitter, Injectable, Output } from '@angular/core';

export enum Privilege {
  Admin = "Admin",
  Normal = "Normal",
  Guest = "Guest"
}
export interface User{
  username:string;
  privilegeType:Privilege //admin,normal,guest
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser:User;
  @Output() userChanged = new EventEmitter();
  constructor() { }
}