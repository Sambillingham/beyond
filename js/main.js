"use strict";
var app = {
  init: function () {
    this.uiActions ();
    this.displayCountdown();
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
        $('.js-schedule__more-info, .schedule-info-overlay').fadeOut();
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
      $('.js-section-header-modal').html('<h2 class="section-header__title">Close</h2>');
      $('.js-slot-info, .js-schedule__more-info, .schedule-info-overlay').fadeIn();

   } else {
      $('.js-slot-info').css('margin-top', pxFromTop).fadeIn();
   }

  },
  daysUntilDate: function(targetDate){
    var today = new Date();
    var beyond = new Date(targetDate);
    var msPerDay = 24 * 60 * 60 * 1000;
    var timeLeft = beyond.getTime() - today.getTime();
    var daysLeft = Math.floor(timeLeft / msPerDay);
    return daysLeft;
  },
  displayCountdown: function(){
    var days = this.daysUntilDate('September 28, 2015').toString();
    if (days.length === 1){
      days = '0' + days;
    }
    $('.days-left__num').first().text(days[0]);
    $('.days-left__num').last().text(days[1]);
  },
  checkHashAndTriggerModal: function(){
    var hash = window.location.hash;
    if(hash){
      this.scheduleSPeakerInfo(hash);
    }
  },
  sizeFixes: function(){

    if(Modernizr.mq('only screen and (min-width: 850px)')) {
      $('.js-ticket-buy-link').detach().insertAfter('.ticket-countdown');
    }

    $(window).on('resize', function(){

      if(Modernizr.mq('only screen and (max-width: 850px)')) {
        $('.js-slot-info').css('margin-top', 0);
        $('.js-ticket-buy-link').detach().insertBefore('.ticket-countdown');
      } else {
        $('.js-section-header-modal').empty();
        $('.js-ticket-buy-link').detach().insertAfter('.ticket-countdown');
      }

    });
  }
};

app.init();
