class MailchimpForm {
  register(form){
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
  }
}
export default new MailchimpForm();