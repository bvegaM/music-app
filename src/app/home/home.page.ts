import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MusicService } from '../services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    centerSlides: true,
    speed: 400,
  };

  songs: any[] = [];
  albums: any[] = [];

  artists = [];

  song: any;
  previusSong: any;
  existSong = false;
  nextSong: any;
  currentSong: any = {};
  newTime: any = 0.0;

  constructor(
    private musicService: MusicService,
    private modalController: ModalController,
    private storage: Storage
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.musicService.getNewReleases().then((newReleases) => {
      this.artists = this.musicService.getArtists().items;
      this.songs = newReleases.albums.items.filter(
        (item) => item.album_type === 'single' && item.name.length < 20
      );
      this.albums = newReleases.albums.items.filter(
        (item) => item.album_type === 'album'
      );
      console.log(this.artists);
    });
  }

  async showSongs(artist) {
    const songs = await this.musicService.getArtistTopTracks(artist.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.tracks,
        artist: artist.name,
        image: artist.images[0].url,
        follows: artist.followers.total,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.song = data.data;
      if (Object.keys(this.song).length > 0) {
        this.existSong = true;
        this.previusSong = this.song;
        this.play();
      } else if (this.existSong) {
        this.existSong = true;
      } else {
        this.existSong = false;
      }
    });
    return await modal.present();
  }

  play() {
    if (this.nextSong) {
      this.pause();
      this.currentSong = {};
    }
    if (Object.keys(this.currentSong).length > 0) {
      this.currentSong.play();
    } else {
      this.currentSong = new Audio(this.song.preview_url);
      this.currentSong.play();
      this.currentSong.addEventListener('timeupdate', () => {
        this.newTime =
          (this.currentSong.currentTime * (this.currentSong.duration / 10)) /
          100;
        if (this.currentSong.currentTime >= this.currentSong.duration) {
          this.song.playing = false;
        }
      });
    }
    this.previusSong.playing = true;
    this.nextSong = true;
  }

  pause() {
    this.currentSong.pause();
    this.previusSong.playing = false;
    this.nextSong = true;
  }

  parseTime(time) {
    if (time) {
      const parseTime = parseInt(time.toString().split('.')[0], 10);
      let minutes = Math.floor(parseTime / 60).toString();
      if (minutes.length === 1) {
        minutes = '0' + minutes;
      }
      let seconds = (parseTime % 60).toString();
      if (seconds.length === 1) {
        seconds = '0' + seconds;
      }
      return minutes + ':' + seconds;
    }
  }
}
