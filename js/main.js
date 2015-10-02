"use strict";
import countdown from './modules/countdown';
import uiActions from './modules/ui-actions';
import schedule from './modules/schedule';

const APP = {
  init: function() {
    svgeezy.init(false, 'png');
    uiActions.init();
    countdown.init();
    schedule.init();
  }
};

APP.init();
