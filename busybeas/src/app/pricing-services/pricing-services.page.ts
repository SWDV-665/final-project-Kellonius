import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pricing-services',
  templateUrl: './pricing-services.page.html',
  styleUrls: ['./pricing-services.page.scss'],
})
export class PricingServicesPage implements OnInit {

  public items: Array<{ title: string; note: string; }> = [
    {
      title: 'One time deep cleaning',
      note: '$25.00/hr'
    },
    {
      title: 'Recurring cleaning',
      note: '$20.00/hr'
    },
    {
      title: 'Item Minimalization',
      note: '$20.00/hr'
    },
    {
      title: 'Home Organization',
      note: '$10.00/hr'
    }
  ];

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async requestServices() {
    const alert = await this.alertController.create({
      header: 'Request Services and Information',
      inputs: [
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
        {
          name: 'address',
          type: 'text',
          placeholder: 'Street Address'
        },
        {
          name: 'city',
          type: 'text',
          placeholder: 'City'
        },
        {
          name: 'state',
          type: 'text',
          placeholder: 'State'
        },
        {
          name: 'zip',
          type: 'text',
          placeholder: 'Zip Code'
        },
        // {
        //   name: 'info',
        //   type: 'radio',
        //   label: 'Seeking More Information',
        //   value: 'Seeking More Inforation',
        //   checked: true
        // },
        // {
        //   name: 'services',
        //   type: 'radio',
        //   label: 'Requesting Services',
        //   value: 'Requesting Services'
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
            // this.handleCreateAccount(x);
          }
        }
      ]
    });

    await alert.present();
  }
}
