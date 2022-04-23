import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {
  constructor(public loginService: LoginService, public router: Router) { }
  canActivate() {

    if (!this.loginService.isAuthenticated()) {
      console.log('te sacó el guard');
      return false;
    }
    return true;

  }

}
