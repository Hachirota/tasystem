import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
})
export class LoginpageComponent implements OnInit {
  loginForm: FormGroup;
  errors: any = [];
  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  isValidInput(fieldName): boolean {
    return (
      this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty ||
        this.loginForm.controls[fieldName].touched)
    );
  }

  login(): void {
    this.errors = [];
    this.authService.login(this.loginForm.value).subscribe(
      () => {
        this.router.navigateByUrl('/');
      },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      }
    );
    console.log(this.loginForm.value);
  }
}
