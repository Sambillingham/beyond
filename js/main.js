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

      $('.timetable__slot').not('.timetable__slot--break, .coming__soon--true, .timetable__slot--gap ').on('click', function(event) {
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

var ScheduleSlot = React.createClass({

  update: function() {
        this.props.handleChange();
  },
  render: function() {
    return (
      <tr id="anchor-name" className="timetable__slot mins-60" onClick={this.update}>
        <td className="timetable__start-time">time</td>
        <td className="timetable__slot-detail">
          <h2 className="timetable__title">title</h2>
          <h3 className="timetable__speaker">Name</h3>
        </td>
      </tr>
    );
  }

});

var ScheduleFullDetails = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      position: '',
      name: '',
      company: '',
      url: '',
      Twitter: '',
      github: '',
      title: '',
      desc: ''
    };
  },
  updateDetails: function(event) {
    console.log('updating details');
    this.setState({
      name: event.target.value,
      position: event.target.value,
      name: event.target.value,
      company: event.target.value,
      url: event.target.value,
      Twitter: event.target.value,
      github: event.target.value,
      title: event.target.value,
      desc: event.target.value
    });
  },
  render: function() {
    return (
      <div className="schedule__more-info js-schedule__more-info">
        <div className="section-header section-header--empty section-header--modal js-section-header-modal">

          <div className="slot-info js-slot-info">
            <img className="slot-info__image js-data-image" src="" alt=""/>
            <div className="slot-info__meta">
              <div className="slot-info__speaker-details">
                <h3 className="js-data-name"></h3>
                <h3 className="js-data-position"></h3>
                <h3 className="js-data-company"></h3>
              </div>

              <nav className="slot-info__links">
                <a href="#" className="js-data-url">
                  <img src="/img/icon-link.svg" alt="Personal site"/>
                </a>
                <a href="#" className="js-data-twitter">
                  <img src="/img/icon-twitter.svg" alt="Twitter profile"/>
                </a>
                <a href="#" className="js-data-github">
                  <img src="/img/icon-github.svg" alt="Github profile"/>
                </a>
              </nav>
            </div>

            <div className="slot-info__description">
              <h3 className="js-data-title"></h3>
              <div className="js-data-description"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Schedule = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  handleChange: function() {
      console.log('click');
  },
  render: function() {
    return (
      <div className="schedule">
        <div className="schedule__talks">
          <div className="section-header">
            <h2 className="section-header__title">Talks</h2>
          </div>

          <table class="timetable js-offset-parent">
            <tbody>
              <ScheduleSlot onUpdate={this.handleChange} />
            </tbody>
          </table>
        </div>

        <div className="schedule__workshops">
          <div className="section-header">
            <h2 className="section-header__title">Workshops</h2>
          </div>

          <table className="timetable js-offset-parent">
            <tbody>
              <tr id="anchor-workshop" className="timetable__slot mins-60 ">
                <td className="timetable__start-time">Time</td>
                <td className="timetable__slot-detail">
                  <h2 className="timetable__title">Title</h2>
                  <h3 className="timetable__speaker">Name</h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ScheduleFullDetails />
      </div>

    );
  }

});

React.render(
  <Schedule />,
  document.querySelector('.schedule')
);

