"use strict";
var app = {
  init: function () {
    this.uiActions ();
    this.calcCountdown();
    this.sizeFixes();
    svgeezy.init(false, 'png');

    // Schedule Specific Init
    if( $('section').hasClass('schedule')){
      this.checkHashAndTriggerModal();
      this.preloadHiddenSpeakerImages();
    }
  },
  uiActions: function () {
      var self = this;
      var form = $('#mc-embedded-subscribe-form');

      $('.sign-up__submit').on('click', function ( event ) {
        self.mailChimpAjaxRegister(form);
        event.preventDefault();
      });

      $('.schedule__session').not('.schedule__session--break, .schedule__session--coming-soon, .schedule__session--gap ').on('click', function(event) {
        var slot = this;
        self.scheduleSPeakerInfo(slot);
        event.preventDefault();
      });

      $('.js-section-header-modal').on('click', function(){
        $('body').removeClass('lock-scroll');
        $('.js-schedule__full-details, .schedule-session-details-overlay').fadeOut();
      });

      $('.session--speaker').on('click', function(){
        var mobile = Modernizr.mq('only screen and (max-width: 850px)');

        if(mobile){
          var slot = this;
          self.scheduleSPeakerInfo(slot);
          event.preventDefault();
          return false;
        } else {
          return true;
        }
      });
  },
  mailChimpAjaxRegister: function (form){
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      cache : false,
      dataType : 'json',
      contentType: 'application/json; charset=utf-8',
      complete : function(data) {

        var message = data.responseJSON.msg;

        if (data.result !== 'success') {
          console.log(data);
          $('.sign-up__message').addClass('sign-up__message--active sign-up__message--fail').html(message);
        } else {
          console.log(data);
          $('.sign-up__message').addClass('sign-up__message--active sign-up__message--success').html(message);
        }
      }
    }); // end AJAX
  },
  preloadHiddenSpeakerImages: function(){
    $('*[data-image]').each(function(i, el){
      if ($(el).data('image')){
        $("<img>").attr("src", '/img/' + $(el).data('image'));
      }
    });
  },
  scheduleSPeakerInfo: function(slot) {
    var $slot = $(slot);
    var pxFromTop = $slot.position().top;
    var data = $slot.data();

    $('.js-data-image').attr('src', '/img/'+ data.image);
    $('.js-data-name').text(data.name);
    $('.js-data-position').text(data.position);
    $('.js-data-company').text(data.company);
    $('.js-data-url').attr('href', data.url);
    $('.js-data-twitter').attr('href', 'https://twitter.com/'+ data.twitter);
    if(data.github){
      $('.js-data-github').attr('href', 'https://github.com/' + data.github);
      $('.js-data-github').fadeIn();
    } else {
      $('.js-data-github').fadeOut();
    }
    $('.js-data-title').text(data.title);
    $('.js-data-description').html(data.description);

   if(Modernizr.mq('only screen and (max-width: 850px)')) {
      $('body').addClass('lock-scroll');
      $('.js-section-header-modal').html('<h2 class="section-header__title section-header__title--without">Close</h2>');
      $('.js-session-details, .js-schedule__full-details, .schedule-session-details-overlay').fadeIn();

   } else {
      $('.js-session-details').css('margin-top', pxFromTop).fadeIn();
   }

  },
  timeUntilDate: function(targetDate, format){
    var today = new Date();
    var target = new Date(targetDate);
    var timeLeftInMs = target.getTime() - today.getTime();
    var msPerMinute = 60 * 1000;
    var msPerHour = 60 * 60 * 1000;
    var msPerDay = 24 * 60 * 60 * 1000;
    var minutesLeft;
    var daysLeft;
    var hoursLeft;

    if (format === 'minutes'){
      minutesLeft = Math.floor(timeLeftInMs / msPerMinute);
      return minutesLeft;
    } else if (format === 'hours'){
      hoursLeft = Math.floor(timeLeftInMs / msPerHour);
      return hoursLeft;
    } else {
      daysLeft = Math.floor(timeLeftInMs / msPerDay);
      return daysLeft;
    }
  },
  inTheFuture: function(date){
    if( this.timeUntilDate(date, 'minutes') > 0 ){
      return true;
    }
  },
  calcCountdown: function(){
    var superEarlyBird = 'September 26, 2015 18:00:00';
    var EarlyBird = 'October 22, 2015 18:00:00';
    var nextIncrease;

    if( this.inTheFuture(superEarlyBird) ){
      nextIncrease = superEarlyBird;
    } else {
      $('.ticket').first().addClass('ticket--sold-out').unwrap('<a href=""></a>');
      $('.ticket').eq(1).removeClass('ticket--unreleased');
      $('.ticket').eq(1).wrap('<a href="https://www.eventbrite.co.uk/e/beyond-conf-2015-tickets-18517110175"></a>');
      nextIncrease = EarlyBird;
    }

    var minutes = this.timeUntilDate(nextIncrease, 'minutes');
    var hours = this.timeUntilDate(nextIncrease, 'hours');
    var days = this.timeUntilDate(nextIncrease, 'days');

    if(minutes <= 60){
      this.displayCountdown( minutes, 'minutes');
    } else if(hours <= 24) {
      this.displayCountdown( hours, 'hours');
    } else {
      this.displayCountdown( days, 'days');
    }
  },
  displayCountdown: function(countdownAmount, format){
    var countdownAsText = countdownAmount.toString();

    if (countdownAsText.length === 1) {
      countdownAsText = '0' + countdownAsText;
    }
    $('.time-left__num').first().text(countdownAsText[0]);
    $('.time-left__num').last().text(countdownAsText[1]);
    $('.js-ticket-contdown__unit').text(format);
  },
  checkHashAndTriggerModal: function(){
    var hash = window.location.hash;
    if(hash){
      this.scheduleSPeakerInfo(hash);
    }
  },
  sizeFixes: function(){

    $(window).on('resize', function(){

      if(Modernizr.mq('only screen and (max-width: 850px)')) {
        $('.js-slot-info').css('margin-top', 0);
      } else {
        $('.js-section-header-modal').empty();
      }

    });
  }
};

app.init();
