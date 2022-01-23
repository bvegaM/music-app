import { Injectable } from '@angular/core';
import * as dataArtists from './artist.json';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  constructor() {}

  getNewReleases() {
    return fetch(
      'https://platzi-music-api.herokuapp.com/browse/new-releases'
    ).then((response) => response.json());
  }

  getArtists() {
    return dataArtists;
  }

  getArtistTopTracks(artistId) {
    return fetch(
      `https://platzi-music-api.herokuapp.com/artists/${artistId}/top-tracks?country=EC`
    ).then((response) => response.json());
  }

  searchTracks(text) {
    return fetch(
      `https://platzi-music-api.herokuapp.com/search?q=${text}&type=track`
    ).then(response => response.json());
  }
}
