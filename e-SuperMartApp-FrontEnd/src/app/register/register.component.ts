import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  
  constructor(private router: Router, 
    private authService: AuthService) {
      console.log('userform', this.userForm);
     }

  ngOnInit() {
  }

  register() {
    
    const user = this.userForm.getRawValue();
    this.authService
      .register(user)
      .subscribe(s=> this.router.navigate(['/login']));
  }

  
}
