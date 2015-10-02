"use strict";
import countdown from './modules/countdown';
import uiActions from './modules/ui-actions';
import speakerModal from './modules/speaker-modal';

const APP = {
  init: function() {
    svgeezy.init(false, 'png');
    uiActions.init();
    countdown.init();
    speakerModal.init();
  }
};

APP.init();
