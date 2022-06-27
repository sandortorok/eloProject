import { SESaveModal } from './../se-bracket/se-save-modal/se-save-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DEGeneratorService, Match } from './de-generator.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SENewModal } from '../se-bracket/se-new-modal/se-new-modal.component';
import { SELoadModal } from '../se-bracket/se-load-modal/se-load-modal.component';
import { DEWinModal } from './de-win-modal/de-win-modal.component';

@Component({
  selector: 'app-de-bracket',
  templateUrl: './de-bracket.component.html',
  styleUrls: ['./de-bracket.component.scss']
})
export class DEBracketComponent implements OnInit {
  @ViewChild('container') container;
  gameName:string = "NÉVTELEN";
  matches:Match[];

  constructor(private bracket: DEGeneratorService, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.bracket.generated.subscribe(()=>{
      this.matches = [];
      this.matches = this.bracket.GeneratedGames
      console.log(this.matches);
      this.giveEffects();
    })
  }
  giveEffects(){
    setTimeout(() => {
      if (this.container != undefined){
        this.giveHoverEffect();
        this.giveCurrentClass();
      }
    });
  }
  giveCurrentClass() {
    let matchups = this.container.nativeElement.querySelectorAll('ul');
    matchups.forEach(m => {
      if(!m.innerHTML.includes('win') && !m.innerHTML.includes('bye')){
        m.classList.add('current');
      }
      else{
        m.classList.remove('current')
      }
    });
  }
  giveHoverEffect() {
    let teamElements = this.container.nativeElement.querySelectorAll('li.team');
    let a = this.container.nativeElement.querySelectorAll("[id='match 0']")

    teamElements.forEach(el => {
      if (el.onmouseover != null) el.onmouseover = null;
      if (el.onmouseleave != null) el.onmouseleave = null;
    });
    let players:string[] = []
    this.matches.forEach(match=>{
      let p1 = match.Csapatok![0];
      let p2 = match.Csapatok![1];
      if(p1 != "" && !players.includes(p1)){
        players.push(p1);
      }
      if(p2 != "" && !players.includes(p2)){
        players.push(p2);
      }
    })
    this.addHoverToPlayers(players, teamElements);
  }
  addHoverToPlayers(players, teamElements){
    players.forEach((playerName:string) => {
      let samePlayer: any[] = []
      teamElements.forEach(el => {
        if (el.innerText.split('\n')[0] == playerName) {
          samePlayer.push(el)
        }
      });
      let match;
      if (playerName.includes('Loser of') || playerName.includes('Winner of')){
        if(playerName.match(/(\d+)/)){
          let id = parseInt(playerName.match(/(\d+)/)![0]); //STRINGBEN LÉVŐ SZÁM (MATCHID)
          match = this.container.nativeElement.querySelector(`[id='match ${id}']`)
        }
      }
      samePlayer.forEach(e => {
        e.onmouseover = () => {
          samePlayer.forEach(same => {
            same.style.opacity = 1;
            same.style.boxShadow = "0 0 5px rgb(71, 228, 9), 0 0 25px rgb(71, 228, 9)"
          })
          if (match){
            match.style.opacity = 1;
            match.style.boxShadow = "0 0 5px rgb(71, 228, 9), 0 0 25px rgb(71, 228, 9)"
          }
        }
        e.onmouseleave = () => {
          samePlayer.forEach(same => {
            same.style.border = "";
            same.style.opacity = "";
            same.style.boxShadow = ""
          })
          if (match){
            match.style.border = "";
            match.style.opacity = "";
            match.style.boxShadow = ""
          }
        }
      })
    });
  }
  onNewBracket(){
    const modalRef = this.modalService.open(SENewModal, { centered: true });
    modalRef.componentInstance.generateEvent.subscribe((players)=>{
      this.matches = [];
      this.bracket.startGenerating('withNames', players=players)
    })
  }
  onSave(){
    if(this.matches == undefined) return;
    if(this.matches.length < 1) return;
    const modalRef = this.modalService.open(SESaveModal, { centered: true });
    let allGames: Match[] = [];
    this.matches.forEach(m=>{
      allGames.push(m);
    })
    modalRef.componentInstance.matches = allGames;
    modalRef.componentInstance.saveMode = 'double-elimination';
    if(this.gameName != 'NÉVTELEN') modalRef.componentInstance.IN_gameID = this.gameName;
  }
  onLoad(){
    const modalRef = this.modalService.open(SELoadModal, { centered: true });
    modalRef.componentInstance.matches = this.matches;
    modalRef.componentInstance.loadMode = 'double-elimination';
    modalRef.componentInstance.loadEvent.subscribe((loadData)=>{
      this.gameName = loadData.name
      this.matches = [];
      //kell idő amíg felfogja hogy a newMatches nem üres.......
      setTimeout(() => {
        this.matches = loadData.matches
        this.giveEffects();
      }, 1000);
      //meg kell várni míg renderel a view
    })
  }
  onTeamClick(event){
    event.target.parentNode.id;
    let matchID = event.target.parentNode.id.match(/(\d+)/)![0];
    let thisMatch = this.matches.filter(m =>{ return m.Meccs_id == matchID})[0];
    if (!thisMatch) return;
    if (thisMatch.Csapatok![0] == "" || thisMatch.Csapatok![1] == "") return;
    if (thisMatch.Csapatok![0].includes('Winner of') || thisMatch.Csapatok![1].includes('Winner of')) return;
    if (thisMatch.Csapatok![0].includes('Loser of') || thisMatch.Csapatok![1].includes('Loser of')) return;

    const modalRef = this.modalService.open(DEWinModal, { centered: true });
    modalRef.componentInstance.match = thisMatch;
    modalRef.componentInstance.updateEvent.subscribe((updatedMatch:Match)=>{
      thisMatch = updatedMatch;
      let vesztes: string;
      if(thisMatch.Csapatok![0] == thisMatch.Gyoztes){
        vesztes = thisMatch.Csapatok![1];
      }
      else { vesztes = thisMatch.Csapatok![0] }
      this.matches.forEach(match=>{
          if(match.Csapatok![0] == `Loser of ${thisMatch.Meccs_id}`){
            match.Csapatok![0] = vesztes
          }
          if(match.Csapatok![1] == `Loser of ${thisMatch.Meccs_id}`){
            match.Csapatok![1] = vesztes
          }
          if(match.Gyoztes == `Loser of ${thisMatch.Meccs_id}`){
            match.Gyoztes = vesztes
          }
      })
      let nextID = thisMatch.nextRoundID!
      if (nextID >= 0){
        let nextMatch:Match;
        nextMatch = this.matches.filter(m=>{return m.Meccs_id == nextID})[0]
        let nextTeam = nextMatch.Csapatok![thisMatch.bottom!]
        if(nextTeam == "" || nextTeam.includes('Winner of')){
          nextMatch.Csapatok![thisMatch.bottom!] = thisMatch.Gyoztes!; //Kövi meccs feltöltése
        }
        else{
          nextMatch.Csapatok![1-thisMatch.bottom!] = thisMatch.Gyoztes!; //Ha már foglalt a hely berakjuk a másikba
        }
      }
      this.giveEffects();
    })
  }
  onPrintClick(){
    window.print()
  }
}
