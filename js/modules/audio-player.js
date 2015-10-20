import jPlayer from 'jplayer';
import $ from 'jquery';

class AudioPlayer {
  init() {
    console.log("test")
    this.setupPlayer()
  }

  setupPlayer() {
    $('.js-audio-player-wrapper').jPlayer({
      ready: function() {
        $(this).jPlayer('setMedia', {
          mp3: $('.js-audio-player-wrapper').data('audio-url')
        });
      },
      preload: 'auto',
      volume: 1,
      cssSelectorAncestor: '.player__container',
      cssSelector: {
        play: '.play-btn',
        pause: '.pause-btn',
        seekBar: '.player__seek-bar',
        playBar: '.player__play-bar',
        currentTime: '.player__current-time',
        duration: '.player__duration'
      }
    });
  }
}
export default new AudioPlayer();