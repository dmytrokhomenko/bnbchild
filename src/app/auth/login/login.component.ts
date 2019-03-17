import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'bnb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();

    this.activatedRoute.params.subscribe((params) => {
      if (params['registred'] === 'success') {
        this.notifyMessage = 'You have been successfuly registered, you can login now!';
      }
    });
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      (token) => {
        debugger;
        this.router.navigate(['/rentals']);
      },
      (err) => {
        this.errors = err.error.errors;
      })
  }

  isInvalidInput(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid && (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required;

  }
}
