import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  _jsonURL: string = environment.apiUrl + '/employees.json';

  constructor(public http: HttpClient) {
  }

  public getJSON(): Observable<any> {

    return this.http.get(this._jsonURL);
  }
  
}
