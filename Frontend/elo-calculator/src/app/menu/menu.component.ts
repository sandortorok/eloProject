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
  constructor(private httpservice: HttpService) { }

  ngOnInit(): void {
    this.httpservice.getCacheFromGame(this.gamePlayed).subscribe((res)=>{
      let myarray:Array<CacheElement> = Object.values(res);
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
      }
    })
  }

}
