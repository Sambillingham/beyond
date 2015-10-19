"use strict";
//vendor
import $ from 'jquery';
import jquery from 'jquery';
import fitvids from 'fitvids';
import svgeezy from 'svgeezy';

//modules
import countdown from './modules/countdown';
import uiActions from './modules/ui-actions';
import schedule from './modules/schedule';
import audioPlayer from './modules/audio-player';

const APP = {
  init: function() {
    // vendor init
    $('.blog-content-video').fitVids();
    svgeezy.init(false, 'png');

    //Module init
    uiActions.init();
    countdown.init();
    schedule.init();
    audioPlayer.init();
  }
};

APP.init();
