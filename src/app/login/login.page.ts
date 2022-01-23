import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validationMessages = {
    email: [
      {
        type: 'required',
        message: 'Email is required.',
      },
      {
        type: 'pattern',
        message: 'Please enter a valid email.',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'Password is required.',
      },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long.',
      },
    ],
  };

  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private router: Router,
    private alert: AlertController,
    private storage: Storage,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
    });
  }

  async ngOnInit() {
    await this.storage.create();
  }

  loginUser(credentials) {
    this.authService.loginUser(credentials).then((res) => {
      this.errorMessage = '';
      this.storage.set('isUserLoggedIn', true);
      //navigate with transition animation to home page
      this.router.navigate(['/menu/home']);
    }).catch(async (err) => {
      console.log(err);
      const alert = this.alert.create({
        header: 'Error',
        message: 'Creedenciales Incorrectas',
        buttons: ['OK'],
      });
      (await alert).present();
    });
  }

  registerPage() {
    this.router.navigate(['/register']);
  }
}
