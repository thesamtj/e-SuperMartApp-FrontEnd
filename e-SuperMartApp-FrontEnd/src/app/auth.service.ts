import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
   
   private user$: Subject<User>();
   private apiUrl = '/api/auth/'

   constructor(private httpClient: HttpClient) { }

   login(email: string, password: string) {
    const loginCredentials = { email, password };
    return this.httpClient.post<User>(`${this.apiUrl}login`, loginCredentials).pipe(
      switchMap(foundUser => {
        this.setUser(foundUser);
        console.log('user found', foundUser);
        return of(foundUser);
      }),
      catchError(e=> {
        return throwError('Login could not be verified. Please try again.');
      })
    );
  } 

  logout() {
    this.setUser(null);
    console.log("user did logout successfull");
  }

  get user() {
    this.user$.asObservable();
  }

  register(user: any) {
    return this.httpClient.post<User>(`${this.apiUrl}register`, user).pipe(
        switchMap(savedUser => {
          this.setUser(savedUser);
          console.log(`user registered successfully`, user);
          return of(savedUse);
        }),
        catchError(e=> {
          console.log('server error occured', e)
          return throwError('Registration failed please conact admin')
        })
      );
  }

  private setUser(user) {
    this.user$.next(user);
  }
  
}
