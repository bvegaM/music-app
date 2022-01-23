import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public appPages = [
    { title: 'Home', url: '', icon: 'home'},
    { title: 'Modo Sport', url: '/folder/Outbox', icon: 'bicycle'},
  ];

  public logOutPage = [
    { title: 'Log out', url: '/folder/Favorites', icon: 'log-out'},
  ];

  constructor(
    private menuController: MenuController,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {}

  logout() {
    this.storage.remove('isUserLoggedIn');
    this.router.navigate(['/login']);
  }
}
