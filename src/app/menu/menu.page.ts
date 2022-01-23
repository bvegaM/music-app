import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  constructor(
    private menuController: MenuController,
    private router: Router,
    private storage: Storage,
  ) {}

  ngOnInit() {}

  logout() {
    this.storage.remove('isUserLoggedIn');
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['menu/home']);
  }

  goSearch() {
    this.router.navigate(['menu/search']);
  }

  goInfo() {
    this.router.navigate(['menu/aboutme']);
  }
}
