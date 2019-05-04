import { Component, OnInit } from '@angular/core';
import { ClientService } from '../providers/client.service';
import { LoginService } from '../providers/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  lineOne: string;
  lineTwo: string;
  city: string;
  state:string;
  zip: string;

  constructor(private clientService: ClientService,
              private loginService: LoginService) { 
                this.refreshInputs();
              }

  ngOnInit() {
    this.refreshInputs();
  }

  updateProfile() {
    this.clientService.updateAddress(this.loginService.currentUser.id.toString(), this.lineOne, this.lineTwo, this.city, this.state, this.zip)
  }

  refreshInputs() {
    if (this.clientService.currentAddress && this.clientService.currentAddress.id != null) {
      this.lineOne = this.clientService.currentAddress.streetOne;
      this.lineTwo = this.clientService.currentAddress.streetTwo === undefined ? "" : this.clientService.currentAddress.streetTwo;
      this.city = this.clientService.currentAddress.city;
      this.state = this.clientService.currentAddress.state;
      this.zip = this.clientService.currentAddress.zip;
    }
  }
 }
