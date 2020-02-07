import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../core/user';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  user: Observable<User>;
  userSubcription: Subscription;

  constructor(private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.user;
    this.userSubcription = this.authService.findMe().subscribe(user => this.user = user);
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.userSubcription) {
      this.userSubcription.unsubscribe();
    }
  }

}
