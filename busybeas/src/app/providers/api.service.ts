import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user-model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiEndPoint = 'http://localhost:53264/'
  public userController = 'User/'

  public GetUserForLoginEndPoint = 'GetUserForLogin'
  public CreateNewUserEndPoint = 'CreateNewUser'

  constructor(public http: HttpClient) { }

  GetUserForLogin(email: string, password: string): Observable<UserModel> {
    const params = new HttpParams().set('username', email).set('password', password);
    return this.http.get<UserModel>(this.apiEndPoint + this.userController + this.GetUserForLoginEndPoint, {params});
  }

  CreateNewUser(email: string, password: string, first: string, last: string) {
    const params = new HttpParams().set('username', email).set('password', password).set('firstname', first).set('lastname',last);
    return this.http.get(this.apiEndPoint + this.userController + this.CreateNewUserEndPoint, {params})
  }
}
