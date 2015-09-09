"use strict";
var app = {
  init: function () {
    this.uiActions ();
    svgeezy.init(false, 'png');
  },
  uiActions: function () {
      var self = this;
      var form = $('#mc-embedded-subscribe-form');

      $('.sign-up__submit').on('click', function ( event ) {
        self.mailChimpAjaxRegister(form);
        event.preventDefault();
      });

      $('.timetable__slot').not('.timetable__slot--break').on('click', function(event) {
        var slot = this;
        self.scheduleSPeakerInfo(slot);
        event.preventDefault();
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
          $('.sign-up__message').addClass('.sign-up__message--active sign-up__message--fail').html(message);
        } else {
          console.log(data);
          $('.sign-up__message').addClass('.sign-up__message--active sign-up__message--success').html(message);
        }
      }
    }); // end AJAX
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
    $('.js-data-github').attr('href', 'https://github.com/' + data.github);
    $('.js-data-title').text(data.title);
    $('.js-data-description').html(data.description);

    $('.js-slot-info').css('margin-top', pxFromTop).fadeIn();
  }
};

app.init();
