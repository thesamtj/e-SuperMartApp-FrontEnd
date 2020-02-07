import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { User } from './user';
import { TokenStorageService } from './token.storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
   
   private user$: Subject<User>();
   private apiUrl = '/api/auth/'

   constructor(private httpClient: HttpClient, 
    private tokenStorage: TokenStorageService) { }

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

  register(userToSave: any) {
    return this.httpClient.post<any>(`${this.apiUrl}register`, userToSave).pipe(
      switchMap(({ user, token }) => {
        this.setUser(user);
        this.tokenStorage.setToken(token);
        console.log(`user registered successfully`, user);
        return of(user);
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
