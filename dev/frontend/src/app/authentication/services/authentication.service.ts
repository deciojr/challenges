import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  routes = {
    authentication: `${environment.origin}/auth/login`,
  };

  accessTokenKey = 'access_token';

  constructor(private http: HttpClient) {}

  getAuthenticationFromLoginInformation(email, password) {
    return btoa(`${email}:${password}`);
  }

  saveAccessToken(accessToken: string) {
    sessionStorage.setItem(this.accessTokenKey, accessToken);
  }

  getAccessToken() {
    return sessionStorage.getItem(this.accessTokenKey);
  }

  removeAccessToken() {
    sessionStorage.removeItem(this.accessTokenKey);
  }

  authenticate(authentication: string) {
    console.log(authentication);
    let headers = new HttpHeaders();

    headers = headers.append('Authentication', `${authentication}`);

    console.log(headers);

    return this.http.get(this.routes.authentication, { headers });
  }
}
