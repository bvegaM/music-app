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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
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
    name: [
      {
        type: 'required',
        message: 'Name is required.',
      },
      {
        type: 'minlength',
        message: 'Name must be at least 2 characters long.',
      },
    ],
    lastName: [
      {
        type: 'required',
        message: 'Last name is required.',
      },
      {
        type: 'minlength',
        message: 'Last name must be at least 2 characters long.',
      },
    ],
  };
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
    private router: Router,
    private alert: AlertController,
    private authService: AuthenticateService
  ) {
    this.registerForm = this.formBuilder.group({
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
      name: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      lastName: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
    });
  }

  registerUser(credentials) {
    this.authService.registerUser(credentials).then(async (user) => {
      const alert = this.alert.create({
        header: 'Registro exitoso!',
        message: 'Ahora puedes iniciar sesión.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/login'], { skipLocationChange: true });
            },
          },
        ],
      });
      (await alert).present();
    });
  }

  async ngOnInit() {
    await this.storage.create();
  }

  loginPage() {
    this.router.navigate(['/login'], { skipLocationChange: true });
  }
}
