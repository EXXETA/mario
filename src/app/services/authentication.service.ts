import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => this.checkToken());
  }

  private checkToken(): void {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        this.authenticationState.next(true);
      }
    });
  }

  public login(username: string, password: string): Promise<void> {
    console.log(username, password);
    return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
      this.authenticationState.next(true);
    });
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
