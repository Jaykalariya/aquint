import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { userProfile } from '../../constants';


@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private currentUserSubject = new ReplaySubject <any>(1);

  constructor() { }

  sendCurrentUser(user: any){
    this.currentUserSubject.next(user);
    this.storeObjectInSessionStorage(userProfile, user);
  }

  storeObjectInSessionStorage(keyName: string, obj: any) {
    sessionStorage.removeItem(keyName);
    sessionStorage.setItem(keyName, JSON.stringify(obj));
  }
  
  clearCurrentUser() {
    this.currentUserSubject.next(null);
    sessionStorage.removeItem(userProfile);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
}
