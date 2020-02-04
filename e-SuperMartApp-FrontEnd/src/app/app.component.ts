import { Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  
  user: User;
  userSubcription: Subscription;

  constructor(private authService: AuthService,
    private router: Router) {
      this.userSubcription = this.authService.user.subscribe(user => (this.user = user)
      );
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
