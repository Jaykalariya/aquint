import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  messages?: string;

  constructor(
    private messageService: MessageService,
    // private authService: AuthService,
    private router: Router
  ) { }

  /**
   * @description handles error for every backend api
   * and shows error toaster message and throws error.
   * @param error - Error
   */

  handleError(error: any, messageObj?: any) {

    if (!messageObj || !messageObj.errorMessage) {
      switch (error.status) {
        case 401:
          {
            this.messages = 'You are Unauthorized to access the data';
            // if (!this.authService.isAuthenticated()) {
            //   this.router.navigate(['/account/login']);
            // }
            break;
          }
        case 500:
          {
            if(error && error.error && error.error.message){
              this.messages = error.error.message;
            }
            else if (error && error.error.ResponseException) {
              this.messages =
                (error.error.ResponseException.ValidationErrors && error.error.ResponseException.ValidationErrors[0])
                  ? error.error.ResponseException.ValidationErrors[0].Message
                  : error.error.ResponseException.ExceptionMessage
                    ? error.error.ResponseException.ExceptionMessage
                    : 'Something went wrong.';
            } else {
              this.messages = 'Something went wrong.';
            }
            break;
          }
        case error.status >= 400 && error.status <= 499:
          this.messages = 'Something went wrong.';
          break;
        default:
          this.messages = 'Something went wrong.';
          break;
      }
    } else {
      this.messages = messageObj.errorMessage;
    }
    if (!messageObj || messageObj.showMessage === undefined || messageObj.showMessage) {
      // this.messageService.showErrorMessage(this.messages);
    }

    // return throwError(this.messages);                  // The signature '(error: any): Observable<never>' of 'throwError' is deprecated.
    return throwError(() => this.messages);
  }
}
