import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { tokenKey, userProfile } from '../../constants';
import { HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private currentApiReqs: HttpRequest<any>[] = [];
  private currentApisReqSub = new BehaviorSubject<any[] | null>(null);
  private currentUserSubject = new ReplaySubject <any>(1);

  constructor() { }

  //#region current apis for custom loader
  setCurrentApis(req: HttpRequest<any> | null) {
    if (req) {
      this.currentApiReqs.push(req);
    } else {
      this.currentApiReqs = [];
      this.currentApiReqs.length = 0;
    }
    this.currentApisReqSub.next(Object.assign([], this.currentApiReqs));
  }

  getCurrentApis(): Observable<any[] | null> {
    return this.currentApisReqSub.asObservable();
  }
  //#endregion

  //#region current apis for custom loader

  getAccessToken(): string | null{
    return sessionStorage.getItem(tokenKey);
  }

  sendCurrentUser(user: any){
    this.currentUserSubject.next(user);
    this.storeObjectInSessionStorage(userProfile, user);
  }

  storeObjectInSessionStorage(keyName: string, obj: any) {
    sessionStorage.removeItem(keyName);
    sessionStorage.setItem(keyName, btoa(JSON.stringify(obj)));
  }
  
  clearCurrentUser() {
    sessionStorage.removeItem(tokenKey);
    sessionStorage.removeItem(userProfile);
    sessionStorage.clear();
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  getLoggedInUserDetails(){
    var jsonString = sessionStorage.getItem(userProfile);
    // console.log(jsonString);
    if(jsonString){
      return JSON.parse(atob(jsonString));
    }
    return null;
  }
  //#endregion
}
