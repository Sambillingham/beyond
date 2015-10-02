class Schedule {
  init() {
    if( $('section').hasClass('schedule')){
      this.checkHashAndTriggerModal();
      this.preloadHiddenSpeakerImages();
      this.checkHashAndTriggerCorrectSchedule();
    }
  }
  preloadHiddenSpeakerImages(){
    $('*[data-image]').each(function(i, el){
      if ($(el).data('image')){
        $("<img>").attr("src", '/img/' + $(el).data('image'));
      }
    });
  }

  checkHashAndTriggerModal(){
    var hash = window.location.hash;
    if(hash !== '#workshops' && hash !== '#talks'){
      this.scheduleSPeakerInfo(hash);
    }
    console.log(hash);
    if(hash === '#anchor-js' || hash === '#anchor-sketch'){
      this.toggleSchedule('workshops');
    }
  }

  checkHashAndTriggerCorrectSchedule(){
    var hash = window.location.hash;
    if(hash === '#workshops'){
      this.toggleSchedule('workshops');
    }
  }

  toggleSchedule(scheduleType){
    if(scheduleType === 'talks'){
      $('.js-schedule__sessions--speakers').show();
      $('.js-schedule__sessions--workshops').hide();
    } else {
      $('.js-schedule__sessions--speakers').hide();
      $('.js-schedule__sessions--workshops').show();
    }
    $('.js-schedule__info').hide();
    $('.js-schedule__info--' + scheduleType).show();
  }

  scheduleSPeakerInfo(slot) {
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
  }
}
export default new Schedule();