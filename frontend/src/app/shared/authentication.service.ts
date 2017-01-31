declare var _;
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Headers} from '@angular/http';
import {CookieService} from './cookie.service';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  private headers = new Headers();

  constructor(private http: Http,
              private cookieService: CookieService,
              private router: Router) {
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }
  connect(user: any): Observable<any> {
    return this
      .http
      .post('/api/login', JSON.stringify(user), {
        headers: this.headers
      })
      .map((res: any) => {
        const data = res.json();
        return data;
      })
      .catch((err: any) => Observable.throw(err));
  }

  register(user: any): Observable<any> {
    return this
      .http
      .post('/api/signup', JSON.stringify(user), {
        headers: this.headers
      })
      .map(this._handleResponse)
      .catch((err: any) => Observable.throw(err));
  }

  forgetPassword(email: string): Observable<any> {
    return this
      .http
      .get('/api/forgotpassword/' + email, {
        headers: this.headers
      })
      .map(this._handleResponse)
      .catch((err: any) => Observable.throw(err));
  }

  disconnect() {
    // code here
  }

  isLoggedIn(): boolean {
    const number = this.cookieService.get('number');
    return false === _.isEmpty(number);
  }

  getLoggedInArtistNumber(): string {
    return this.cookieService.get('number');
  }

  checkLoginAndRedirect() {
    if (false === this.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  private _handleResponse(response: any) {

    return JSON.parse(response._body);
  }

  private _handleError(error: any) {
    console.log(error);
    return Observable.throw(error);
  }
}
