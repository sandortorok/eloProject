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
////////////////////////////////////////////ELOPLAYERS////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
getEloPlayers(){
  return this.http.get(this.url+ '/eloplayers')
    .pipe(catchError(this.handleError));
}

createEloPlayer(body:{name:string, gameType: string}){
  return this.http.post(this.url + '/eloplayer',body)
    .pipe(catchError(this.handleError));
}

updateEloPlayer(property, body:{name:string,games?:number, rating?:number, gameType:string}){ //property is => rating or games
  return this.http.patch(this.url+ '/eloplayer/' + property, body)
    .pipe(catchError(this.handleError));
}

deleteEloPlayer(body:{name:string, gameType:string}){
  return this.http.delete(this.url + '/eloplayer', {body: body},)
}

addEloGame(body){
  return this.http.post(this.url + '/elogames',body)
    .pipe(catchError(this.handleError));
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
////////////////////////////////////////////RRMATCHES////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
  getRRMatch(name){
    return this.http.get(this.url+ '/rrmatch/'+name)
      .pipe(catchError(this.handleError));
  }
  getRRMatchNames(){
    return this.http.get(this.url+ '/rrmatches/names')
      .pipe(catchError(this.handleError));
  }
  saveRRGame(body){
    return this.http.post(this.url + '/rrgame',body)
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