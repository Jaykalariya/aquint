import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { throwError as observableThrowError, of } from 'rxjs';
import { CommunicationService } from '../../services/communication/communication.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private communicationService: CommunicationService) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const jwt = this.communicationService.getAccessToken();
//     console.log(jwt);
//     request = request.clone({
//       setHeaders: { 
//         'Authorization': `Bearer ${jwt}`
//       }
//     });
//     return next.handle(request);
//   }
// }


intercept(
  req: HttpRequest<any>,
  next: HttpHandler
): Observable<HttpEvent<any>> {
  let requestToForward = req;
  const token = this.communicationService.getAccessToken();

  if (token !== '' && token !== undefined) {
    const tokenValue = `Bearer ${token}`;
    requestToForward = req.clone({
      setHeaders: { Authorization: tokenValue },
    });
  }
  return next.handle(requestToForward).pipe(
    map((event) => {
      return event;
    }),
    catchError((error) => {
      console.log(error)
      // if (
      //   error.status === 401 &&
      //   !requestToForward.url.includes('refreshToken')
      // ) {
      //   return this.handleTokenExpired(req, next);
      // } else if (
      //   error.status === 401 &&
      //   requestToForward.url.includes('refreshToken')
      // ) {
      //   this.router.navigate(['/']);
      // } else if (error.status === SERVER_CONNECTION_ERROR) {
      //   error.error.message = ERROR_MAP.ERR_CONNECTING_WITH_SERVER;
      // } else {
      //   const serverErr = SERVER_ERRORS.find(
      //     (err) => err.code === error.status
      //   );
      //   if (serverErr) throw error;
      // }
      return observableThrowError(() => error);
    })
  );
  }
}