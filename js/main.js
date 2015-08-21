var app = {
  init: function () {
    this.uiActions ();

  },
  uiActions: function () {
      var self = this;
      var form = $('#mc-embedded-subscribe-form');

      $('.sign-up__submit').on('click', function ( event ) {
        self.mailChimpAjaxRegister(form);
        event.preventDefault();
      });

      $('.more-speakers__btn').on('click', function(){

        var speakerBlockPadding = parseInt( $('.speakers').css('padding-top'));
        var speakerBlockHeight = parseInt( $('.speaker').height());
        var speakerContainerHeight = speakerBlockHeight * 2 + speakerBlockPadding + 46;
        $('.speakers').animate({'height': speakerContainerHeight }, 500);
        return false;
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
          console.log(data)
          $('.sign-up__message').addClass('sign-up__message--fail').html(message);
        } else {
          console.log(data)
          $('.sign-up__message').addClass('sign-up__message--success').html(message);
        }
      }
    }); // end AJAX
  }
};

app.init();
