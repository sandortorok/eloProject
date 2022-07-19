import { HttpService } from 'src/app/services/http.service';
import { SortPipe } from './../pipes/sort.pipe';
import { swissPlayer } from './../services/data.service';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Match } from '../services/data.service';

interface Pair{
  players:string[]
  penalty:number
  white:number
}
@Injectable({
  providedIn: 'root'
})
export class SwissGeneratorService {
  GeneratedGames:Match[] = [];
  exampleTeams:string[] = []
  @Output() generated = new EventEmitter<Match[]>();
  @Output() generatedNext = new EventEmitter<Match[]>();

  constructor(private sortpipe: SortPipe, private httpservice: HttpService) { }
  startGenerating(gameType: string = 'example', players?: string[]){
    let players_length = 7;
    if (players == undefined){}
    switch (gameType){
      case 'example':
        this.loadExampleTeams(players_length);
        this.generateFirstRound(this.exampleTeams);
        break;
      case 'withNames':
        this.generateFirstRound(players!);
        break;
      default:
        this.loadExampleTeams(players_length);
        this.generateFirstRound(this.exampleTeams);
        break;
    }
  }
  generateFirstRound(players:string[]){
    this.GeneratedGames = [];
    if(players.length %2 == 1){
      players.push('')
    }
    let p_count = players.length;
    for(let gameNumber = 0; gameNumber < p_count/2; gameNumber++){
      let newGame:Match = {
        Csapatok: [players[gameNumber], players[p_count-1-gameNumber]],
        Round: 1,
        nextRoundID: -1,
        Gyoztes: '',
        Meccs_id: gameNumber,
        bye: false,
        bottom: 0,
        score0:null,
        score1:null,
        white: 0 // Csapatok[0] : white
      }
      if(players[gameNumber] == ''){
        newGame.Gyoztes = players[p_count-1-gameNumber];
        newGame.score1 = 1;
        newGame.bye = true;
        newGame.white = -1;
      }
      if(players[p_count-1-gameNumber] == ''){
        newGame.Gyoztes = players[gameNumber];
        newGame.score0 = 1;
        newGame.bye = true;
        newGame.white = -1;
      }
      this.GeneratedGames.push(newGame);
    }
    setTimeout(() => {
      this.generated.emit(this.GeneratedGames)
    }, 1000);
  }
  generateNextRound(previousMatches:Match[], players:swissPlayer[]){
    let returning = false
    let previousMatches2 = JSON.parse(JSON.stringify(previousMatches));
    previousMatches2.forEach(prevM=>{
      if(prevM.Gyoztes == "") returning = true;
    })
    if(returning) return;
    if(players.length <= 0) return;
    let chessMode = false;
    if (players[0].gameType == 'sakk') chessMode = true;
    let newRoundNumber = previousMatches2[previousMatches2.length-1].Round+1;
    let newMatchID = previousMatches2.length;
    let leftPlayerNames:string[] = []
    players.forEach(p=>{
      leftPlayerNames.push(p.name)
    })

    let newMatches:Match[] = [];
    if(players.length%2 == 1){ //IF THERE IS BYE, FIND THE WORST PLAYER WITH MINIMUM BYES, AND GIVE HIM BYE
      let byePlayer:string = "";
      let minByes = players[0].byes;
      players.forEach(p=>{
        if(p.byes <= minByes) {
          minByes = p.byes;
          byePlayer = p.name;
        }
      });
      newMatches.push({
        Csapatok: [byePlayer, ''], Gyoztes: byePlayer, Round: newRoundNumber, nextRoundID: -1, Meccs_id: newMatchID,
        bye: true, bottom: 0, score0: 1, score1: 0, white:-1 })
      newMatchID++;
      this.deleteFromArray(leftPlayerNames, byePlayer)
    }
    let possiblePairs = this.findAllPairsWithPenalty(previousMatches2, players, leftPlayerNames, chessMode);
    let matrix = this.createEdmondMatrix(possiblePairs, leftPlayerNames)
    console.log(matrix);
    let sub = this.httpservice.generateEdmond({matrix:matrix}).subscribe(result=>{
      let res = Object.values(result)
      let chosenPairs:Pair[] = []
      let pushedList:string[] = []
      res.forEach((p1_idx:number, p2_idx)=>{
        let p1 = leftPlayerNames[p1_idx]
        let p2 = leftPlayerNames[p2_idx]
        let pairs = possiblePairs.filter(pair=>{ 
          return pair.players.includes(p1) && pair.players.includes(p2) && !pushedList.includes(p1)&& !pushedList.includes(p2)
        });
        pushedList.push(p1)
        pushedList.push(p2)
        pairs = this.sortpipe.transform(pairs, ['!penalty']);
        if(pairs.length > 0) chosenPairs.push(pairs[0])
      })
      console.log(chosenPairs);
      chosenPairs.forEach(pair=>{
        newMatches.push({ Csapatok: pair.players, Gyoztes: '', Round: newRoundNumber, nextRoundID: -1, Meccs_id: newMatchID, bye: false, bottom: 0, score0: null, score1: null, white:0 })
          newMatchID++;
      })
      newMatches.forEach(newM=>{
        previousMatches2.push(newM);
      })
      this.generatedNext.emit(previousMatches2);
      sub.unsubscribe();
    })
  }
  createEdmondMatrix(possiblePairs:Pair[], leftPlayerNames){
    let EdmondMatrix:number[][] = []
    possiblePairs.forEach(pair=>{
      let idx1 = leftPlayerNames.indexOf(pair.players[0])
      let idx2 = leftPlayerNames.indexOf(pair.players[1])
      EdmondMatrix.push([idx1, idx2, 9999999 - pair.penalty])
    })
    return EdmondMatrix;
  }
  findAllPairsWithPenalty(matches:Match[], players:swissPlayer[],leftPlayerNames:string[], chessMode:boolean){
    let possiblePairs:Array<Pair> = []; //white is idx 0;
    players.forEach(p=>{
      players.forEach(p2=>{
        if(p.name != p2.name && leftPlayerNames.includes(p.name) && leftPlayerNames.includes(p2.name)){ //HA A KÉT NÉV NEM UGYANAZ ÉS BENNE VAN A NÉVLISTÁBAN MINDKETTŐ
          let newPairing:Pair = {players:[p.name, p2.name], penalty:0, white:0} //WHITE IS P1
          if(chessMode && p.blackWhiteHistory && p2.blackWhiteHistory){
            if (p.blackWhiteHistory[0] == "W"){ 
              newPairing.penalty += 10
              if (p.blackWhiteHistory.length > 1 && p.blackWhiteHistory[1] == 'W'){ //P1 CANT PLAY 3 WHITES IN A ROW
                newPairing.penalty += 200
              }
            }
            if (p2.blackWhiteHistory[0] == "B"){ 
              newPairing.penalty += 10 
              if (p2.blackWhiteHistory.length > 1 && p2.blackWhiteHistory[1] == 'B'){//P2 CANT PLAY 3 BLACKS IN A ROW
                newPairing.penalty += 200
              }
            }
          }
          let diff = Math.abs(p.points-p2.points);
          newPairing.penalty += diff*diff*100;
          possiblePairs.push(newPairing);
        }
      })
    })
    matches.forEach(m=>{
      this.deleteExistingPairing(possiblePairs,m.Csapatok);
      this.deleteExistingPairing(possiblePairs,[m.Csapatok[1], m.Csapatok[0]]);
    })
    possiblePairs = this.sortpipe.transform(possiblePairs, ['!penalty']);
    return possiblePairs;
  }
  deleteFromArray(arr:string[], element:string){
    const idx = arr.indexOf(element);
    if (idx > -1) { // only splice array when item is found
      arr.splice(idx, 1); // 2nd parameter means remove one item only
    }
  }
  deleteExistingPairing(arr:Array<{players:string[], penalty:number, white:number}>, element:string[]){
    arr.forEach((el, idx)=>{
      if(el.players[0] == element[0] && el.players[1] == element[1]){
        arr.splice(idx, 1);
      }
    })
  }
  loadExampleTeams(how_many:number){
    this.exampleTeams = [];
    for (let i = 0; i < how_many; i++) {
      this.exampleTeams.push(`${i + 1}. Játékos`);
    }
  }
  // findBestPairingOptimal(possiblePairs:Pair[], leftPlayerNames:string[]){
  //   let res = this.selectWhiteBlack(possiblePairs, leftPlayerNames);
  //   let blackList = res.blackList
  //   let whiteList = res.whiteList

  //   let newPairs = possiblePairs.filter(pair=>{return whiteList.includes(pair.players[0]) && blackList.includes(pair.players[1])})
  //   let costMatrix = this.createMatrix(newPairs, whiteList, blackList);
  //   let chosenPairs:Pair[] = []
  //   this.httpservice.generateMunkres({matrix:costMatrix}).subscribe(res=>{
  //     let result = Object.values(res);
  //     result.forEach(pair=>{
  //       chosenPairs.push({white:0, players: [whiteList[pair[0]], blackList[pair[1]]], penalty: costMatrix[pair[0]][pair[1]]})
  //     })
  //     console.log('chosenPairs', chosenPairs);
  //     this.munkresFinished.emit(chosenPairs);
  //   })
  // }
  // createMatrix(pairs:Pair[], whiteNames:string[], blackNames:string[]){
  //   let costMatrix:number[][] = []
  //   whiteNames.forEach(white=>{
  //     let whiteRow:number[] = []
  //     blackNames.forEach(black=>{
  //       let filtered = pairs.filter(pair=>{
  //         return pair.players[0] == white && pair.players[1] == black;
  //       })
  //       if(filtered.length == 1){
  //         whiteRow.push(filtered[0].penalty)
  //       }
  //       else{
  //         whiteRow.push(999999);
  //       }
  //     })
  //     costMatrix.push(whiteRow)
  //   })
  //   return costMatrix;
  // }
  // selectWhiteBlack(possiblePairs:Pair[], leftPlayerNames:string[]){
  //   let finalWhiteList:string[] = []
  //   let finalBlackList:string[] = []
  //   let averages:Array<{name:string, whiteAvg: number, blackAvg:number, whiteLength: number, blackLength:number}> = []
  //   leftPlayerNames.forEach(name => {
  //     let whiteList = possiblePairs.filter(pair=>{return pair.players[0] == name && pair.penalty < 1000})
  //     let blackList = possiblePairs.filter(pair=>{return pair.players[1] == name && pair.penalty < 1000})
  //     if(blackList.length == 0){
  //       finalWhiteList.push(name);
  //     }
  //     else if(whiteList.length == 0){
  //       finalBlackList.push(name)
  //     }
  //     else{
  //       let whiteAvg = 0;
  //       whiteList.forEach(whitePair=>{
  //         whiteAvg += whitePair.penalty
  //       })
  //       whiteAvg /= whiteList.length
  
  //       let blackAvg = 0;
  //       blackList.forEach(blackPair=>{
  //         blackAvg += blackPair.penalty
  //       })
  //       blackAvg /= blackList.length
  //       averages.push({name:name, whiteAvg: whiteAvg, blackAvg:blackAvg, whiteLength: whiteList.length, blackLength: blackList.length})
  //     }
  //   });
  //   averages = this.sortpipe.transform(averages, ['whiteAvg']);
  //   averages.forEach(a=>{
  //     console.log(a);
  //   })
  //   while(finalWhiteList.length != leftPlayerNames.length/2){
  //     finalWhiteList.push(averages[averages.length-1].name);
  //     averages.pop();
  //   }
  //   while(finalBlackList.length != leftPlayerNames.length/2){
  //     finalBlackList.push(averages[averages.length-1].name);
  //     averages.pop();
  //   }
  //   return {whiteList:finalWhiteList, blackList:finalBlackList}
  // }
  // printMatrix(matrix:Pair[][]){
  //   let allStr = "%cXXXXXXXXXX  || "
  //   matrix[0].forEach(col => {
  //     let playerStr = col.players[1];
  //     while(playerStr.length < 11){
  //       playerStr+=" ";
  //     }
  //     allStr+=playerStr
  //     allStr+="||";
  //   });
  //   console.log(allStr, "color: #007acc;");
  //   console.log("%c------------||---------------------------------------------------------------------------------------------------------------------------------||", "color: #007acc;");
  //   matrix.forEach(row=>{
  //     let rowStr = ""
  //     row.forEach(el=>{
  //       let elStr = `${el.penalty}`
  //       while(elStr.length < 11){
  //         elStr+=" ";
  //       }
  //       rowStr += elStr;
  //       rowStr += '||';
  //     })
  //     let firstInCol = row[0].players[0];
  //     while(firstInCol.length < 11){
  //       firstInCol+= " ";
  //     }
  //     firstInCol = "%c" + firstInCol
  //     console.log(firstInCol,"color: #007acc;", '||', rowStr);
  //   })
  // }

}
