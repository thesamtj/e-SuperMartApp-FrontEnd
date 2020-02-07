import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  error: BehaviorSubject<string>;

  constructor(private router: Router, 
    private authService: AuthService) { }

  ngOnInit() {
    this.error = new BehaviorSubject('');
  }

  login() {
    this.setError('');
    this.authService
    .login(this.email, this.password)
    .subscribe(s => this.router.navigate(['']), 
    e => (this.setError(e)));
  }


  private setError(msg: any) {
    return this.error.next(msg);
  }
}
