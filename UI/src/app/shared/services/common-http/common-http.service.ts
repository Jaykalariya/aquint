import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { apiUrl, serverUrl } from '../../constants'; 
import { RequestObj, Responsebody } from '../../interfaces/http-request';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { MessageService } from '../message/message.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
  ) {  }

  /**
   * @description: Common get method
   * @requestObj: request object contains things which need to be sent with request.
   * @returns: Return the generic response
   */
  get(requestObj: RequestObj): Observable<any> {
    var requestUrl = apiUrl + requestObj.uri;
    if (requestObj.baseApiUrl){
      requestUrl = requestObj.baseApiUrl + requestObj.uri
    }
    return this.http.get(requestUrl).pipe(
      map((response: any) => {
        if (requestObj.message && requestObj.message.successMessage) {
          // this.messageService.showSuccessMessage(requestObj.message.successMessage);
        }
        return response;
      }),
      catchError((error) => {
        return this.errorHandlerService.handleError(error, requestObj.message || null);
      }));
  }

  /**
   * @description: Common Post method
   * @returns: Returns the inserted object
   */
  post<T, R>(requestObj: RequestObj): Observable<R> {
    
    return this.http.post(apiUrl + requestObj.uri, requestObj.object, requestObj.options).pipe(
      map((response: any) => {
        if (requestObj.message && requestObj.message.successMessage) {
          // this.messageService.showSuccessMessage(requestObj.message.successMessage);
        }
        return response;
      }),
      catchError((error) => {
        return this.errorHandlerService.handleError(error, requestObj.message || null);
      }));
  }

  /**
   * @description: Common Put method
   * @returns: Returns the updated object
   */
  put<T, R>(requestObj: RequestObj): Observable<R> {

    return this.http.put(apiUrl + requestObj.uri, requestObj.object, requestObj.options).pipe(
      map((response: any) => {
        if (requestObj.message && requestObj.message.successMessage) {
          // this.messageService.showSuccessMessage(requestObj.message.successMessage);
        }
        return response;
      }),
      catchError((error) => {
        return this.errorHandlerService.handleError(error, requestObj.message || null);
      }));
  }

  /**
   * @description: Common Delete method
   * @returns: Returns the generic type
   */
  delete<T>(requestObj: RequestObj): Observable<T> {

    return this.http.delete(apiUrl + requestObj.uri).pipe(
      map((response: Responsebody<T>) => {
        if (requestObj.message && requestObj.message.successMessage) {
          // this.messageService.showSuccessMessage(requestObj.message.successMessage);
        }
        return response.value;
      }),
      catchError((error) => {
        return this.errorHandlerService.handleError(error, requestObj.message || null);
      }));
  }

  /**
   * @description: Common Post method
   * @returns: Returns the inserted object
   */
  crossPost<T, R>(requestObj: RequestObj): Observable<R> {
    
    return this.http.post(requestObj.uri, requestObj.object).pipe(
      map((response: any) => {
        if (requestObj.message && requestObj.message.successMessage) {
          // this.messageService.showSuccessMessage(requestObj.message.successMessage);
        }
        return response;
      }),
      catchError((error) => {
        return this.errorHandlerService.handleError(error, requestObj.message || null);
      }));
  }
}
