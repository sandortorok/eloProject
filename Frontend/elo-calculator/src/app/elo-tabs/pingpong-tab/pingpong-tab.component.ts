import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Player, DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-pingpong-tab',
  templateUrl: './pingpong-tab.component.html',
  styleUrls: ['./pingpong-tab.component.scss']
})
export class PingpongTabComponent implements OnInit {
  players:Player[] = [];
  playing:string[] = [];
  
  player1Selected:boolean = false;
  selPlayer1: string = "1. Játékos";
  p1rating = 0;
  
  player2Selected:boolean = false;
  selPlayer2: string = "2. Játékos";
  p2rating = 0;

  winnerSelected:boolean = false;
  selWinner: string = "Győztes";

  p1Gain = 0;
  p2Gain = 0;
  constructor(private dataservice: DataService, private httpservice: HttpService,  private modalService: NgbModal) {
    this.players = dataservice.pingpongPlayers;
    this.playing[2] = "Döntetlen"
  }

  ngOnInit(): void {
  }
  onP1Select(value){
    this.selPlayer1 = value
    this.player1Selected = true
    this.playing[0] = value
    let idx = this.indexOfPlayer(value);
    this.p1rating = this.players[idx].rating
    this.selWinner = "Győztes"
    this.winnerSelected = false;
    this.p1Gain = 0;
    this.p2Gain = 0;
  }
  onP2Select(value){
    this.selPlayer2 = value
    this.player2Selected = true
    this.playing[1] = value
    let idx = this.indexOfPlayer(value);
    this.p2rating = this.players[idx].rating
    this.selWinner = "Győztes"
    this.winnerSelected = false;
    this.p1Gain = 0;
    this.p2Gain = 0;
  }
  onWSelect(value){
    this.selWinner = value
    this.winnerSelected = true
    if(!this.AllSelected()) return;

    let data = this.getResultData();
    if(data == undefined) return;
    this.p1Gain = data['newP1'] - data['oldP1'];
    this.p2Gain = data['newP2'] - data['oldP2'];
  }
  AllSelected(){
    if(this.selWinner != "Győztes" && this.selPlayer1 != "1. Játékos" && this.selPlayer2 != "2. Játékos"){
      return true;
    }
    return false;
  }
  indexOfPlayer(name: string){
    let needed_index = -1;
    this.players.forEach((player, index)=>{
      if(player.name == name){
        needed_index = index
      }
    })
    return needed_index;
  }
  playMatch(){
    if (!this.AllSelected()) return

    let data = this.getResultData();
    if (data == undefined) return
    let idx1 = this.indexOfPlayer(this.selPlayer1);
    this.players[idx1].rating = data!['newP1'];
    this.p1rating = data!['newP1'];

    let idx2 = this.indexOfPlayer(this.selPlayer2);
    this.players[idx2].rating = data!['newP2'];
    this.p2rating = data!['newP2'];

    this.httpservice.updatePingPongPlayer('rating', {name: this.players[idx1].name, rating: this.players[idx1].rating})
      .subscribe(res=>{})

    this.httpservice.updatePingPongPlayer('rating', {name: this.players[idx2].name, rating: this.players[idx2].rating})
      .subscribe(res=>{})

    this.httpservice.updatePingPongPlayer('games', {name: this.players[idx1].name, games: this.players[idx1].games+=1})
      .subscribe(res=>{})

    this.httpservice.updatePingPongPlayer('games', {name: this.players[idx2].name, games: this.players[idx2].games+=1})
      .subscribe(res=>{})

    let gameobj = {}
    gameobj['name1'] = this.players[idx1].name;
    gameobj['name2'] = this.players[idx2].name;
    console.log(data['p1Win']);
    gameobj['p1Win'] = data['p1Win'];
    gameobj['p1Gain'] = this.p1Gain;
    gameobj['p2Gain'] = this.p2Gain;

    this.httpservice.addPingPongGame(gameobj)
      .subscribe(res=>{})

    this.p1Gain = 0;
    this.p2Gain = 0;
    this.selWinner = "Győztes"
    this.winnerSelected = false;
  }
  getResultData(){
    if (!this.AllSelected()) return;
    let data = {}
    let idx1 = this.indexOfPlayer(this.selPlayer1);
    let p1 = this.players[idx1];
    data['oldP1'] = p1.rating;
    let idx2 = this.indexOfPlayer(this.selPlayer2);
    let p2 = this.players[idx2];
    if (idx1 == idx2) return undefined
    data['oldP2'] = p2.rating;

    let p1Win = -1;
    if (this.selPlayer1 == this.selWinner){
      p1Win = 1;
    }
    else if(this.selPlayer2 == this.selWinner){
      p1Win = 0;
    }
    else if (this.selWinner = "Döntetlen"){
      p1Win = 0.5
    }
    data['p1Win'] = p1Win;
    if (p1Win == -1) return;
    let result = this.dataservice.match(p1.rating, p2.rating, p1Win);
    data['newP1'] = result['1'];
    data['newP2'] = result['2'];
    return data;
  }
  openModal(content){
    this.modalService.open(content, {size: 'xl'});
  }
}
