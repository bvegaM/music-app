import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


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

  constructor() {
  }

}
