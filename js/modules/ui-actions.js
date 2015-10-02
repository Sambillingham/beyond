import schedule from './schedule';
import mailchimpForm from './mailchimp-form';

class UiActions {
  init() {
    var form = $('#mc-embedded-subscribe-form');

    $('.sign-up__submit').on('click', function ( event ) {
      mailchimpForm.mailChimpAjaxRegister(form);
      event.preventDefault();
    });

    $('.schedule__session, .js-schedule__details').not('.schedule__session--break, .schedule__session--coming-soon, .schedule__session--gap ').on('click', function(event) {
      var slot = this;
      schedule.scheduleSPeakerInfo(slot);
      event.preventDefault();
    });

    $('.js-section-header-modal').on('click', function(){
      $('body').removeClass('lock-scroll');
      $('.js-schedule__full-details, .schedule-session-details-overlay').fadeOut();
    });

    $('.js-schedule-toggle').on('click', function(){
      var scheduleType = $(this).data('schedule-type');
      $('.js-session-details').fadeOut(200);
      schedule.toggleSchedule(scheduleType);
    });

    $(window).on('resize', function(){

      if(Modernizr.mq('only screen and (max-width: 850px)')) {
        $('.js-slot-info').css('margin-top', 0);
      } else {
        $('.js-section-header-modal').empty();
      }

    });
  }
}
export default new UiActions();