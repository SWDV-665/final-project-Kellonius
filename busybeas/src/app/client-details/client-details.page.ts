import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { UserModel } from '../models/user-model';
import { ClientService } from '../providers/client.service';
import { AddressModel } from '../models/address-model';
import { LoginService } from '../providers/login.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.page.html',
  styleUrls: ['./client-details.page.scss'],
})
export class ClientDetailsPage implements OnInit {

  client: UserModel
  firstName: string;
  lastName: string;
  lineOne: string;
  lineTwo: string;
  city: string;
  state: string;
  zip: string;

  constructor(private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private loginService: LoginService) {
    this.clientService.clientAddress = new AddressModel();
    this.client = new UserModel({
      id: activatedRoute.snapshot.params.id,
      email: activatedRoute.snapshot.params.email,
      firstName: activatedRoute.snapshot.params.firstName,
      lastName: activatedRoute.snapshot.params.lastName,
      isAdmin: activatedRoute.snapshot.params.isadmin
    })

    this.firstName = this.client.firstName;
    this.lastName = this.client.lastName;
    this.getClientAddress(this.client.id);
    this.clientService.getRequestedServices(this.client.id);
  }

  ngOnInit() {
  }

  getClientAddress(userId: number) {
    this.clientService.getClientaddress(userId);
  }

  updateProfile() {
    this.clientService.updateAddress(this.client.id.toString(), this.clientService.clientAddress.streetOne, this.clientService.clientAddress.streetTwo, 
    this.clientService.clientAddress.city, this.clientService.clientAddress.state, this.clientService.clientAddress.zip)
  }

  getRequestedServices() {
    return this.clientService.requestedServices;
  }

  removeTimeFromDate(date: string){
    let array = date.split('T');
    return array[0];
  }
}
