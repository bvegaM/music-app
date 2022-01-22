import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {
    this.storage.create();
  }

  async canActivate() {
    const isIntroShowed = await this.storage.get('isIntroShowed');
    if (isIntroShowed) {
      return true;
    } else {
      this.router.navigateByUrl('/intro');
    }
  }
}
