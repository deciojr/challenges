import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthenticationService } from '@authentication/services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAccessTokenToRequest(request));
  }

  addAccessTokenToRequest(request: HttpRequest<unknown>) {
    const accessToken: string = this.authenticationService.getAccessToken();

    if (!!!accessToken) {
      return request;
    }

    const authorizationPrefix = 'Bearer';

    return request.clone({
      setHeaders: {
        Authorization: `${authorizationPrefix} ${accessToken}`,
      },
    });
  }
}
