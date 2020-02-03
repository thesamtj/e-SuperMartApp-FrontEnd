import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
   
   private user$: Subject<User>();
   constructor() { }

  login(email: string, password: string) {
    const loginCredentials = { email, password };
    console.log('logincredentials', loginCredentials);
    return of(loginCredentials);
  }

  logout() {
    this.setUser(null);
    console.log("user did logout successfull");
  }

  get user() {
    this.user$.asObservable();
  }

  register(user: any) {
    this.setUser(user);
    console.log('registered user successfully', user);
    return of(user);
  }

  private setUser(user) {
    this.user$.next(user);
  }
  
}
