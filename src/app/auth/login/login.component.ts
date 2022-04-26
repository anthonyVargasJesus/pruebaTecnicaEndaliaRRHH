import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  public loginForm: FormGroup;
  public submitted = false;
  public passwordTextType: boolean = false;

  constructor(public _loginService: LoginService,
    private _formBuilder: FormBuilder,) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {



  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    let user = new User();
    user.email = this.loginForm.value.email;
    user.password = this.loginForm.value.password;

    this._loginService.login(user);

  }

}
