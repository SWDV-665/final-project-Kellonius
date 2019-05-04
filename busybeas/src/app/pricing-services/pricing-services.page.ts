import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ClientService } from '../providers/client.service';
import { RequestService } from '../providers/request.service';
import { ServiceModel } from '../models/service-model';
import { LoginService } from '../providers/login.service';

@Component({
  selector: 'app-pricing-services',
  templateUrl: './pricing-services.page.html',
  styleUrls: ['./pricing-services.page.scss'],
})
export class PricingServicesPage implements OnInit {

  constructor(private alertController: AlertController,
    private toastController: ToastController,
    private clientService: ClientService,
    private requestService: RequestService,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
  }

  async requestServices(serviceId: number) {
    if (!this.loginService.userLoggedIn) {
      const toast = await this.toastController.create({
        message: 'Please log in to request services!',
        duration: 2000
      });
      toast.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Request Services and Information',
        inputs: [
          {
            name: 'date',
            type: 'date'
          },
          {
            name: 'name',
            type: 'text',
            placeholder: 'Name'
          },
          {
            name: 'email',
            type: 'email',
            placeholder: 'Email'
          },
          // {
          //   name: 'address',
          //   type: 'text',
          //   placeholder: 'Street Address'
          // },
          // {
          //   name: 'city',
          //   type: 'text',
          //   placeholder: 'City'
          // },
          // {
          //   name: 'state',
          //   type: 'text',
          //   placeholder: 'State'
          // },
          // {
          //   name: 'zip',
          //   type: 'text',
          //   placeholder: 'Zip Code'
          // }

        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Send Request',
            handler: x => {
              this.requestService.requestService(x, serviceId);
            }
          }
        ]
      });

      await alert.present();
    }
  }

  getServices() {
    return this.requestService.services;
  }

}
