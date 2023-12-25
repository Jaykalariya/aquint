import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { CommunicationService } from '../../services/communication/communication.service';
import { filter } from 'lodash';

@Injectable()
export class LoaderService implements HttpInterceptor  {
  
  private totalRequests = 0;
  private requests: HttpRequest<any>[] = [];

  constructor(private communicationService: CommunicationService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    // if (i >= 0) {
    //   this.requests.splice(i, 1);
    //   if(this.requests.length === 0){
    //      this.communicationService.setCurrentApis(null);
    //   }
    // }
    this.requests = filter(this.requests, (request: any) => !(request.url == req.url));    
    if(this.requests.length == 0){
      this.communicationService.setCurrentApis(null);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // removing query params
    const queryParamsArray = req.url.split('?');
    const reqStr = queryParamsArray[0];

    // don't show loader if following queryString param is set
    if(queryParamsArray.includes("hideLoader=true"))
    {
      return next.handle(req);
    }

    // setting current api if its present in LoaderApis list to show custom loader
    this.requests.push(req);
    this.communicationService.setCurrentApis(req);

    return next.handle(req).pipe(
      finalize(() => {
        this.removeRequest(req);
      })
    );

  }
}
