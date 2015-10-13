"use strict";
//vendor
import fitvid from '../bower_components/fitvids/jquery.fitvids.js';

//modules
import countdown from './modules/countdown';
import uiActions from './modules/ui-actions';
import schedule from './modules/schedule';
import visitor from './modules/visitor-banner';

const APP = {
  init: function() {
    // vendor init
    $('.blog-content-video').fitVids();
    svgeezy.init(false, 'png');

    //Module init
    visitor.init();
    uiActions.init();
    countdown.init();
    schedule.init();
  }
};

APP.init();
