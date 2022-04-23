import { Injectable, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { TIME_TO_WAIT } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _jsonURL: string = environment.apiUrl + '/users.json';
  loading: boolean = false;

  constructor(public http: HttpClient, public router: Router) {
  }


  login(currentUser: User) {

    this.loading = true;
    this.getJSON().subscribe(async usersFromBackend => {

      await new Promise(f => setTimeout(f, TIME_TO_WAIT));

      if (this.existsInDatabase(currentUser, usersFromBackend)) {
        let token = this.getFakeToken();
        this.saveTokenInStorage(token);
        this.redirectToHome();
      }
      else
        Swal.fire('Acceso Denegado', 'El correo electrónico y/o contraseña son incorrectos', 'error');

      this.loading = false;
    });

  }

  existsInDatabase(currentUser: User, users: User[]) {
    let isAuthenticated = false;
    users.forEach(item => {
      if (currentUser.email == item.email && currentUser.password == item.password)
        isAuthenticated = true;
    })
    return isAuthenticated;
  }

  redirectToHome() {
    this.router.navigate(['/pages/employee-search']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  saveTokenInStorage(token: string) {
    localStorage.setItem('token', token);
  }

  removeTokenInStorage() {
    localStorage.removeItem('token');
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  public getFakeToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  }

  logout() {
    this.removeTokenInStorage();
    this.redirectToLogin();
  }



  public isAuthenticated(): boolean {

    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire('Acceso Restringido', 'Debe iniciar sesión para acceder a esta página', 'error');
      this.redirectToLogin();
      return false;
    }

    return true;

  }


}
