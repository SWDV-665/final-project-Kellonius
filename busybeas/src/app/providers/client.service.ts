import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { ApiService } from './api.service';
import { AddressModel } from '../models/address-model';
import { ServiceRequestModel } from '../models/service-model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientList: UserModel[] = new Array<UserModel>();
  currentAddress: AddressModel;
  clientAddress: AddressModel = new AddressModel();
  requestedServices: ServiceRequestModel[];
  hasAddress: boolean = false;
  

  constructor(private apiService: ApiService) { }

  getClients() {
    this.apiService.GetClients().subscribe(x => {
      this.clientList = x;
    })
  }

  updateAddress(userid: string, lineOne: string, lineTwo: string, city: string, state: string, zip: string) {
    this.apiService.UpdateAddress(userid, lineOne, lineTwo, city, state, zip).subscribe();
  }

  getAddress(userId: string) {
    this.apiService.GetAddress(userId).subscribe(x => {
      this.currentAddress = x;

      if (x.id != null){
        this.hasAddress = true;
      }
    });
  }

  getClientaddress(userId: number) {
    this.apiService.GetAddress(userId.toString()).subscribe(x => {
      this.clientAddress = x;
    });
  }

  getRequestedServices(userId: number) {
    this.apiService.GetRequestedServices(userId.toString()).subscribe(x => this.requestedServices = x);
  }

}
