import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  loginUser(credentials){
    return new Promise((resolve      , reject) => {
      if(credentials.email === 'test@test.com' && credentials.password === 'patito.123'){
        resolve('login correcto');
      }else{
        reject('login incorrecto');
      }
    });
  }
}
