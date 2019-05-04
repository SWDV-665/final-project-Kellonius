import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ApiService } from './api.service';
import { ServiceModel } from '../models/service-model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public services: Array<ServiceModel> = [];
  
  constructor(
    private loginService: LoginService,
    private apiService: ApiService
  ) { }

  requestService(account: any, serviceId: number) {
    this.apiService.RequestService(account, serviceId, this.loginService.currentUser.id.toString()).subscribe();
  }

  getServices() {
    this.apiService.getServices().subscribe(x => this.services = x);
  }
}
