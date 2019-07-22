import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

const TOKEN_KEY = 'auth-token';

type User = {
  username: string,
  name: string,
  lastName: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly loginUrl = 'https://us-central1-winter-cogency-247408.cloudfunctions.net/login';
  private authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient, private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => this.checkToken());
  }

  private checkToken(): void {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        this.authenticationState.next(true);
      }
    });
  }

  public login(username: string, password: string): Observable<User> {
    const requestObject = {
      'username': username,
      'password': password
    };
    return this.http.post<User>(this.loginUrl, requestObject, { observe: 'response' }).pipe(
      tap(resp => this.authenticationState.next(resp.status === 200)),
      map(resp => resp.body),
      catchError(_ => of(void 0))
    );
  }

  public logout(): Promise<void> {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authenticationState;
  }


}
