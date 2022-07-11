import { HttpService } from 'src/app/services/http.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CacheElement } from '../services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('bracketnav') bracketnav;
  @Input() gamePlayed:string = ""
  @Input() mainNav;
  se:boolean = false;
  de:boolean = false;
  rr:boolean = false;
  gp:boolean = false;
  constructor(private httpservice: HttpService) { }

  ngOnInit(): void {
    this.httpservice.getCacheFromGame(this.gamePlayed).subscribe((res)=>{
      let myarray:Array<CacheElement> = Object.values(res);
      this.setVariables(myarray)
      if(myarray.length > 0){
        let type =  myarray[0].bracketType;
        if (type == 'double-elimination'){
          this.bracketnav.select(3);
        }
        if (type == 'single-elimination'){
          this.bracketnav.select(2);
        }
        if (type == 'round-robin'){
          this.bracketnav.select(4);
        }
        if (type == 'group-stage'){
          this.bracketnav.select(1);
        }
        if (type == 'elo-system'){
          this.bracketnav.select(5);
        }
      }
    })
  }
  colorHexes(){
    this.httpservice.getCacheFromGame(this.gamePlayed).subscribe((res)=>{
      let myarray:Array<CacheElement> = Object.values(res);
      this.setVariables(myarray);
    })
  }
  setVariables(arr:Array<CacheElement>){
    arr.forEach(el=>{
      if (el.bracketType == 'single-elimination'){
        this.se = true;
      }
      if (el.bracketType == 'double-elimination'){
        this.de = true;
      }
      if (el.bracketType == 'round-robin'){
        this.rr = true;
      }
      if (el.bracketType == 'group-stage'){
        this.gp = true;
      }
    })
  }
}
