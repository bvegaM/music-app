/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  userData: any;

  constructor(private storage: Storage) {}

  async loginUser(credentials) {
    this.userData = await this.storage.get('userData');
    return new Promise((resolve, reject) => {
      if (
        credentials.email === this.userData.email &&
        btoa(credentials.password) === this.userData.password
      ) {
        resolve('login correcto');
      } else {
        reject('login incorrecto');
      }
    });
  }

  async registerUser(credentials) {
    credentials.password = btoa(credentials.password);
    return await this.storage.set('userData', credentials);
  }
}
