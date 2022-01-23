import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage {
  songs: any[] = [];
  artist: string;
  image: string;
  followers: number;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {}

  ionViewDidEnter() {
    this.songs = this.navParams.data.songs.filter(song=> song.preview_url);
    this.artist = this.navParams.data.artist;
    this.image = this.navParams.data.image;
    this.followers = this.navParams.data.follows;
  }

  async selectSong(song) {
    await this.modalController.dismiss(song);
  }

  millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds;
  }
}
