import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserModel } from '../models/user-model';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment'
import { Observable, Subject } from 'rxjs';
import { ClientService } from './client.service';
import { AddressModel } from '../models/address-model';

// import { hash } from 'bcrypt'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  dataChanged$: Observable<boolean>

  private dataChangedSubject: Subject<boolean>

  adminLoggedIn: boolean = false;
  userLoggedIn: boolean = false;
  currentUser: UserModel;
  alphabet = "abcdefghijklmnopqrstuvwxyz";
  fullAlphabet = this.alphabet + this.alphabet + this.alphabet;

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private clientService: ClientService
  ) {
    this.dataChangedSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangedSubject.asObservable();
   }

  handleLogout() {
    this.adminLoggedIn = false;
    this.userLoggedIn = false;
    this.currentUser = new UserModel();
    this.clientService.currentAddress = new AddressModel();
    this.dataChangedSubject.next(true)
    this.logoutToast();
  }

  handleLogin(account: any) {

    let hashUser = this.hashString(account.email);
    let hashPass = this.hashString(account.password);
 
    this.apiService.GetUserForLogin(hashUser, hashPass).subscribe(x => {

      this.currentUser = x;

      if (x.isAdmin === false) {
        this.adminLoggedIn = false;
      }

      if (x.isAdmin === true) {
        this.adminLoggedIn = true;
      }

      this.userLoggedIn = true;
      this.dataChangedSubject.next(true)

      this.loginToast( x.firstName, x.lastName);
      this.clientService.getClients();
      this.clientService.getAddress(x.id.toString());
      return

    }, error => {
      this.errorToast(error.error.Message);
    })

  }

  handleCreateAccount(account: any) {
    let hashUser = this.hashString(account.email);
    let hashPass = this.hashString(account.password);
    let hashFirst = this.hashString(account.firstname);
    let hashLast = this.hashString(account.lastname);

    this.apiService.CreateNewUser(hashUser, hashPass, hashFirst, hashLast).subscribe(x => {
      this.handleLogin(account);
    });
  }

  hashString(word: string) {

    var cipherFinish = '';
    let key = moment().date()
    key = (key % this.alphabet.length);
    word = word.toLowerCase();
    
  
    for(var i = 0; i < word.length; i++ ){
       var letter = word[i];
       var upper = (letter == letter.toUpperCase());
       letter = letter.toLowerCase();
      
       var index = this.alphabet.indexOf(letter);
       if(index == -1){
         cipherFinish += letter;
       } else {
         index = ((index + key) + this.alphabet.length);
         var nextLetter = this.fullAlphabet[index];
         if(upper) nextLetter = nextLetter.toUpperCase();
         cipherFinish += nextLetter;
       }
    }

    return cipherFinish;
  }

  async loginToast(first?: string, last?: string) {
      const toast = await this.toastController.create({
        message: 'Welcome back ' + this.capitalizeFirstLetter(first) + ' ' + this.capitalizeFirstLetter(last) + '!',
        duration: 2000
      });
      toast.present();
  }

  async logoutToast() {
    const toast = await this.toastController.create({
      message: 'Logging Out...',
      duration: 2000
    });
    toast.present();
}

async errorToast(error: string) {
  const toast = await this.toastController.create({
    message: error,
    duration: 2000
  });
  toast.present();
}

capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

}
