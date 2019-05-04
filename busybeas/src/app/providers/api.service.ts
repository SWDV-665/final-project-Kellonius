import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddressModel } from '../models/address-model';
import { ServiceModel } from '../models/service-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiEndPoint = 'http://localhost:53264/'
  public userController = 'User/'
  public requestController = 'Request/'

  public GetUserForLoginEndPoint = 'GetUserForLogin';
  public CreateNewUserEndPoint = 'CreateNewUser';
  public GetClientsEndPoint = 'GetClients';
  public UpdateAddressEndPoint = 'UpdateAddress';
  public GetAddressEndPoint = 'GetAddress';
  public CreateRequestEndPoint = 'CreateRequest';
  public GetServicesEndPoint = 'GetServices';

  constructor(public http: HttpClient) { }

  GetUserForLogin(email: string, password: string): Observable<UserModel> {
    const params = new HttpParams().set('username', email).set('password', password);
    return this.http.get<UserModel>(this.apiEndPoint + this.userController + this.GetUserForLoginEndPoint, {params});
  }

  CreateNewUser(email: string, password: string, first: string, last: string) {
    const params = new HttpParams().set('username', email).set('password', password).set('firstname', first).set('lastname',last);
    return this.http.get(this.apiEndPoint + this.userController + this.CreateNewUserEndPoint, {params})
  }

  GetClients(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiEndPoint + this.userController + this.GetClientsEndPoint);
  }

  UpdateAddress(userid: string, lineOne: string, lineTwo: string, city: string, state: string, zip: string) {
    const params = new HttpParams().set('userid', userid).set('lineOne', lineOne).set('lineTwo', lineTwo).set('city', city).set('state', state).set('zip', zip);
    return this.http.get(this.apiEndPoint + this.userController + this.UpdateAddressEndPoint, {params})
  }

  GetAddress(userid: string): Observable<AddressModel> {
    const params = new HttpParams().set('userid', userid);
    return this.http.get<AddressModel>(this.apiEndPoint + this.userController + this.GetAddressEndPoint, {params})
  }

  RequestService(account:any, serviceId: number, userId: string){
    const params = new HttpParams().set('uId', userId).set('date', account.date).set('sId', serviceId.toString()).set('email', account.email)
    return this.http.get(this.apiEndPoint + this.requestController + this.CreateRequestEndPoint, {params})
  }
  getServices(): Observable<ServiceModel[]> {
    return this.http.get<ServiceModel[]>(this.apiEndPoint + this.requestController + this.GetServicesEndPoint)
  }
}
