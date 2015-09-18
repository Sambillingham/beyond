"use strict";
var app = {
  init: function init() {
    this.uiActions();
    this.displayCountdown();
    this.sizeFixes();
    svgeezy.init(false, 'png');

    // Schedule Specific Init
    if ($('section').hasClass('schedule')) {
      this.checkHashAndTriggerModal();
      this.preloadHiddenSpeakerImages();
    }
  },
  uiActions: function uiActions() {
    var self = this;
    var form = $('#mc-embedded-subscribe-form');

    $('.sign-up__submit').on('click', function (event) {
      self.mailChimpAjaxRegister(form);
      event.preventDefault();
    });

    $('.timetable__slot').not('.timetable__slot--break, .coming__soon--true, .timetable__slot--gap ').on('click', function (event) {
      var slot = this;
      self.scheduleSPeakerInfo(slot);
      event.preventDefault();
    });

    $('.js-section-header-modal').on('click', function () {
      $('body').removeClass('lock-scroll');
      $('.js-schedule__more-info, .schedule-info-overlay').fadeOut();
    });
  },
  mailChimpAjaxRegister: function mailChimpAjaxRegister(form) {
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      cache: false,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      complete: function complete(data) {

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
  preloadHiddenSpeakerImages: function preloadHiddenSpeakerImages() {
    $('*[data-image]').each(function (i, el) {
      if ($(el).data('image')) {
        $("<img>").attr("src", '/img/' + $(el).data('image'));
      }
    });
  },
  scheduleSPeakerInfo: function scheduleSPeakerInfo(slot) {
    var $slot = $(slot);
    var pxFromTop = $slot.position().top;
    var data = $slot.data();

    $('.js-data-image').attr('src', '/img/' + data.image);
    $('.js-data-name').text(data.name);
    $('.js-data-position').text(data.position);
    $('.js-data-company').text(data.company);
    $('.js-data-url').attr('href', data.url);
    $('.js-data-twitter').attr('href', 'https://twitter.com/' + data.twitter);
    if (data.github) {
      $('.js-data-github').attr('href', 'https://github.com/' + data.github);
      $('.js-data-github').fadeIn();
    } else {
      $('.js-data-github').fadeOut();
    }
    $('.js-data-title').text(data.title);
    $('.js-data-description').html(data.description);

    if (Modernizr.mq('only screen and (max-width: 850px)')) {
      $('body').addClass('lock-scroll');
      $('.js-section-header-modal').html('<h2 class="section-header__title">Close</h2>');
      $('.js-slot-info, .js-schedule__more-info, .schedule-info-overlay').fadeIn();
    } else {
      $('.js-slot-info').css('margin-top', pxFromTop).fadeIn();
    }
  },
  daysUntilDate: function daysUntilDate(targetDate) {
    var today = new Date();
    var beyond = new Date(targetDate);
    var msPerDay = 24 * 60 * 60 * 1000;
    var timeLeft = beyond.getTime() - today.getTime();
    var daysLeft = Math.floor(timeLeft / msPerDay);
    return daysLeft;
  },
  displayCountdown: function displayCountdown() {
    var days = this.daysUntilDate('September 28, 2015').toString();
    $('.days-left__num').first().text(days[0]);
    $('.days-left__num').last().text(days[1]);
  },
  checkHashAndTriggerModal: function checkHashAndTriggerModal() {
    var hash = window.location.hash;
    if (hash) {
      this.scheduleSPeakerInfo(hash);
    }
  },
  sizeFixes: function sizeFixes() {

    if (Modernizr.mq('only screen and (min-width: 850px)')) {
      $('.js-ticket-buy-link').detach().insertAfter('.ticket-countdown');
    }

    $(window).on('resize', function () {

      if (Modernizr.mq('only screen and (max-width: 850px)')) {
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

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ScheduleSlot = React.createClass({
  displayName: 'ScheduleSlot',

  showDetails: function showDetails() {
    this.props.onSlotClick(this.props);
  },
  render: function render() {
    return React.createElement(
      'tr',
      { id: 'anchor-name', className: 'timetable__slot mins-60', onClick: this.showDetails },
      React.createElement(
        'td',
        { className: 'timetable__start-time' },
        this.props.startTtime
      ),
      React.createElement(
        'td',
        { className: 'timetable__slot-detail' },
        React.createElement(
          'h2',
          { className: 'timetable__title' },
          this.props.title
        ),
        React.createElement(
          'h3',
          { className: 'timetable__speaker' },
          this.props.name
        )
      )
    );
  }

});

var ScheduleFullDetails = React.createClass({
  displayName: 'ScheduleFullDetails',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'schedule__more-info js-schedule__more-info' },
      React.createElement('div', { className: 'section-header section-header--empty section-header--modal js-section-header-modal' }),
      React.createElement(
        ReactCSSTransitionGroup,
        { transitionName: 'example' },
        React.createElement(
          'div',
          { key: 'modal', className: 'slot-info js-slot-info' },
          React.createElement('img', { className: 'slot-info__image js-data-image', src: '/img/' + this.props.data.image, alt: '' }),
          React.createElement(
            'div',
            { className: 'slot-info__meta' },
            React.createElement(
              'div',
              { className: 'slot-info__speaker-details' },
              React.createElement(
                'h3',
                { className: 'js-data-name' },
                this.props.data.name
              ),
              React.createElement(
                'h3',
                { className: 'js-data-position' },
                this.props.data.position
              ),
              React.createElement(
                'h3',
                { className: 'js-data-company' },
                this.props.data.company
              )
            ),
            React.createElement(
              'nav',
              { className: 'slot-info__links' },
              React.createElement(
                'a',
                { href: this.props.data.url, className: 'js-data-url' },
                React.createElement('img', { src: '/img/icon-link.svg', alt: 'Personal site' })
              ),
              React.createElement(
                'a',
                { href: this.props.data.twitter, className: 'js-data-twitter' },
                React.createElement('img', { src: '/img/icon-twitter.svg', alt: 'Twitter profile' })
              ),
              React.createElement(
                'a',
                { href: this.props.data.github, className: 'js-data-github' },
                React.createElement('img', { src: '/img/icon-github.svg', alt: 'Github profile' })
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'slot-info__description' },
            React.createElement(
              'h3',
              { className: 'js-data-title' },
              this.props.data.title
            ),
            React.createElement(
              'div',
              { className: 'js-data-description' },
              this.props.data.description
            )
          )
        )
      )
    );
  }
});

var Schedule = React.createClass({
  displayName: 'Schedule',

  getInitialState: function getInitialState() {
    return {
      name: '',
      position: '',
      company: '',
      url: '',
      twitter: '',
      github: '',
      title: '',
      desc: ''
    };
  },
  handleSlotClick: function handleSlotClick(slot) {
    this.setState(slot);
  },
  render: function render() {
    var shed = this;
    var slotNodes = this.props.data.map(function (slot) {
      return React.createElement(ScheduleSlot, { onSlotClick: shed.handleSlotClick, anchor: slot.anchor, duration: slot.duration, soon: slot.soon, image: slot.image, name: slot.name, title: slot.title, postion: slot.postion, company: slot.company, url: slot.url, twitter: slot.twitter, github: slot.github, description: slot.description, startTime: slot.startTime });
    });

    return React.createElement(
      'div',
      { className: 'schedule' },
      React.createElement(
        'div',
        { className: 'schedule__talks' },
        React.createElement(
          'div',
          { className: 'section-header' },
          React.createElement(
            'h2',
            { className: 'section-header__title' },
            'Talks'
          )
        ),
        React.createElement(
          'table',
          { 'class': 'timetable js-offset-parent' },
          React.createElement(
            'tbody',
            null,
            slotNodes
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'schedule__workshops' },
        React.createElement(
          'div',
          { className: 'section-header' },
          React.createElement(
            'h2',
            { className: 'section-header__title' },
            'Workshops'
          )
        ),
        React.createElement(
          'table',
          { className: 'timetable js-offset-parent' },
          React.createElement(
            'tbody',
            null,
            React.createElement(
              'tr',
              { id: 'anchor-workshop', className: 'timetable__slot mins-60 ' },
              React.createElement(
                'td',
                { className: 'timetable__start-time' },
                'Time'
              ),
              React.createElement(
                'td',
                { className: 'timetable__slot-detail' },
                React.createElement(
                  'h2',
                  { className: 'timetable__title' },
                  'Title'
                ),
                React.createElement(
                  'h3',
                  { className: 'timetable__speaker' },
                  'Name'
                )
              )
            )
          )
        )
      ),
      React.createElement(ScheduleFullDetails, { data: this.state })
    );
  }

});

var data = [{ startTime: '11:20', name: "Pete Hunt", title: "This is one comment" }, { startTime: '11:40', name: "Jordan Walke", title: "This is *another* comment" }];

React.render(React.createElement(Schedule, { data: data }), document.querySelector('.schedule'));