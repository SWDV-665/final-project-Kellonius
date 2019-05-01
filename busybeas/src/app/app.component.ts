import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from './providers/login.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Pricing and Services',
      url: '/pricing-services',
      icon: 'cash'
    },
    {
      title: 'Client List',
      url: '/list',
      icon: 'list'
    }
  ];

  userLoggedIn: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private loginService: LoginService
  ) {

    this.initializeApp();
    loginService.dataChanged$.subscribe(uli => {
      this.getUserLoggedIn();
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logoutClick() {
    this.loginService.handleLogout();
    }

  async loginClick() {
    const alert = await this.alertController.create({
      header: 'Login',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Email'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        },

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
          text: 'Ok',
          handler: x => {
            this.loginService.handleLogin(x);
          }
        }
      ]
    });

    await alert.present();
  }

  handleCreateAccount(account: any) {

  }

  async createAccount() {
    const alert = await this.alertController.create({
      header: 'Create Account',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email Address'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        },
        {
          name: 'firstname',
          type: 'text',
          placeholder: 'First Name'
        },
        {
          name: 'lastname',
          type: 'text',
          placeholder: 'Last Name'
        }
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
          text: 'Ok',
          handler: x => {
            this.loginService.handleCreateAccount(x);
          }
        }
      ]
    });

    await alert.present();
  }

  getUserLoggedIn() {
    this.userLoggedIn = this.loginService.userLoggedIn;
  }

}
