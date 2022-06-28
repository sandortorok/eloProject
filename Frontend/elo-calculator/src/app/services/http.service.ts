import { BadInput } from '../errors/bad-input';
import { NotFoundError } from '../errors/not-found-error';
import { AppError } from '../errors/app-error';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';





/**
 * HTTP Request-eket küldő osztály. A választ minden esetben Observable visszatéréssel adjuk meg.
 * Ez azért hasznos, mert erre fel lehet iratkozni más osztályokból is.
 */
@Injectable()
export class HttpService {

  private url:string = 'http://localhost:3000'

  constructor(private http:HttpClient) {   }
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////CHESS////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
  getChessPlayers(){
    return this.http.get(this.url+ '/chessplayers')
      .pipe(catchError(this.handleError));
  }

  createChessPlayer(name){
    return this.http.post(this.url + '/chessplayer',{name: name})
      .pipe(catchError(this.handleError));
  }

  updateChessPlayer(property, body){ //property is => rating or games
    return this.http.patch(this.url+ '/chessplayer/' + property, body)
      .pipe(catchError(this.handleError));
  }
  
  deleteChessPlayer(name){
    return this.http.delete(this.url + '/chessplayer', {body: {name: name}},)
  }
  
  addChessGame(body){
    return this.http.post(this.url + '/chessgames',body)
      .pipe(catchError(this.handleError));
  }

/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////KLASK////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

  getKlaskPlayers(){
    return this.http.get(this.url+ '/klaskplayers')
      .pipe(catchError(this.handleError));
  }

  createKlaskPlayer(name){
    return this.http.post(this.url + '/klaskplayer',{name: name})
      .pipe(catchError(this.handleError));
  }

  updateKlaskPlayer(property, body){ //property is => rating or games
    return this.http.patch(this.url+ '/klaskplayer/' + property, body)
      .pipe(catchError(this.handleError));
  }

  deleteKlaskPlayer(name){
    return this.http.delete(this.url + '/klaskplayer', {body: {name: name}},)
  }

  addKlaskGame(body){
    return this.http.post(this.url + '/klaskgames',body)
      .pipe(catchError(this.handleError));
  }
  
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////PINGPONG/////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
  getPingPongPlayers(){
    return this.http.get(this.url+ '/pingpongplayers')
      .pipe(catchError(this.handleError));
  }

  createPingPongPlayer(name){
    return this.http.post(this.url + '/pingpongplayer',{name: name})
      .pipe(catchError(this.handleError));
  }

  updatePingPongPlayer(property, body){ //property is => rating or games
    return this.http.patch(this.url+ '/pingpongplayer/' + property, body)
      .pipe(catchError(this.handleError));
  }

  addPingPongGame(body){
    return this.http.post(this.url + '/pingponggames',body)
      .pipe(catchError(this.handleError));
  }
/////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////VOLLEYBALL////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
  getVolleyTeams(){
    return this.http.get(this.url+ '/volleyteams')
      .pipe(catchError(this.handleError));
  }
  private handleError(error:Response){
    if (error.status === 404){
      return throwError(new NotFoundError(error))
    }
    if (error.status === 400){
      return throwError(new BadInput(error))
    }
    return throwError(new AppError(error))
  }
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////SEMATCHES////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
  getSEMatch(name){
    return this.http.get(this.url+ '/sematch/'+name)
      .pipe(catchError(this.handleError));
  }
  getSEMatchNames(){
    return this.http.get(this.url+ '/sematches/names')
      .pipe(catchError(this.handleError));
  }
  saveSEGame(body){
    return this.http.post(this.url + '/segame', body)
    .pipe(catchError(this.handleError));
  }
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////DEMATCHES////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
  getDEMatch(name){
    return this.http.get(this.url+ '/dematch/'+name)
      .pipe(catchError(this.handleError));
  }
  getDEMatchNames(){
    return this.http.get(this.url+ '/dematches/names')
      .pipe(catchError(this.handleError));
  }
  saveDEGame(body){
    return this.http.post(this.url + '/degame',body)
    .pipe(catchError(this.handleError));
  }
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////CACHE//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
  getCache(){
    return this.http.get(this.url+ '/cache')
      .pipe(catchError(this.handleError));
  }
  getCacheFromGame(gameType){
    return this.http.get(this.url+ '/cache/'+gameType)
      .pipe(catchError(this.handleError));
  }
  saveCache(body){
    return this.http.post(this.url + '/savecache',body)
    .pipe(catchError(this.handleError));
  }
}