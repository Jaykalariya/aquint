import { Injectable } from '@angular/core';
import { userProfile, tokenKey } from '../../constants';
import { CommonHttpService } from '../common-http/common-http.service';
import { CommunicationService } from '../communication/communication.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  profile: any;

  constructor(private commonHttpService: CommonHttpService,
              private communicationService: CommunicationService) { 
    this.profile = sessionStorage.getItem(userProfile);
    if(this.profile){
      this.setLoggedInProfileDetails(this.profile);
    }
  }

  //#region manage access token
  getAccessToken(){
    return sessionStorage.getItem(tokenKey);
  }

  setAccessToken(loginResponse: any){
    sessionStorage.removeItem(tokenKey);
    sessionStorage.setItem(tokenKey, loginResponse.accessToken);
    // this.getProfileDetails();
    this.setLoggedInProfileDetails(loginResponse);
  }
  //#endregion

  setLoggedInProfileDetails(profile: any){
    // prepare profile object
    let userDetails = {
      id: profile.id,
      username: profile.username,
      email: profile.email,
      roles: profile.roles,
      firstName: profile.firstName,
      lastName: profile.lastName,
      mobile: profile.mobile
    }
    this.communicationService.sendCurrentUser(userDetails);
  }

  // getProfileDetails(){
  //   this.commonHttpService.get({
  //     uri: ''
  //   }).subscribe(response => {
  //     this.setLoggedInProfileDetails(response);
  //   })
  // }
}
