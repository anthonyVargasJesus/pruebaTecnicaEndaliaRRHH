import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  loading: boolean = false;

  constructor(public _loginService: LoginService) { }

  ngOnInit(): void {

  }

  save(f: NgForm) {

    this.loading = true;

    // if (!this.isValidForm(f))
    //   return;

    //this._loginService.login(this.user);
    this._loginService.login(this.user)
    
    
  }

}
