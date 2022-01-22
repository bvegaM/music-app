import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidespreview: 1,
    centeredSlides: true,
  };

  slides = [
    {
      title:'Escucha tu música',
      subTitle:'En cualquier lugar',
      description:'Los mejores albumentos de la música, en cualquier momento, en cualquier lugar.',
      icon:'play',
    },
    {
      title:'Modo búsqueda',
      subTitle:'Busca tus canciones en esta aplicación',
      description:'En esta aplicación podrás buscar tus canciones favoritas',
      icon:'search',
    }
  ];

  constructor(private router: Router, private storage: Storage) { }

  finish(){
    this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/login');
  }

  async ngOnInit() {
    await this.storage.create();
  }

}
