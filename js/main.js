"use strict";
//vendor
import $ from 'jquery';
import fitvids from 'fitvids';

//modules
import countdown from './modules/countdown';
import uiActions from './modules/ui-actions';
import schedule from './modules/schedule';

const APP = {
  init: function() {
    // vendor init
    $('.blog-content-video').fitVids();
    svgeezy.init(false, 'png');

    //Module init
    uiActions.init();
    countdown.init();
    schedule.init();
  }
};

APP.init();
