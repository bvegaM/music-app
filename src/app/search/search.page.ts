import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searching = false;
  text = 'Ingresa palabras clave para buscar tu canción';
  songs: any[];
  song: any;
  currentSong: HTMLAudioElement;

  constructor(private songService: MusicService) { }

  ngOnInit() {
  }

  async getTracks(keywords: string) {
    console.log(keywords);
    this.searching = true;
    if (keywords.length > 0) {
      this.songService.searchTracks(keywords).then(async resp => {
        this.songs = await resp.tracks.items.filter((item: any) => item.preview_url);
        if (this.songs.length === 0) {
          this.text = 'No hay resultados para tu búsqueda';
        }
        this.searching = false;
      });
    } else {
      this.text = 'Ingresa palabras clave para buscar tu canción';
      this.songs = null;
      this.searching = false;
    }
  }

  play(song: any) {
    if (this.currentSong) {
      this.pause();
    }
    this.song = song;
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('ended', () => this.song.playing = false);
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

}
