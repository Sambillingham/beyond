class Countdown {
  init(){
    this.calcCountdown();
  }
  timeUntilDate(targetDate, format){
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
  }

  inTheFuture(date){
    if( this.timeUntilDate(date, 'minutes') > 0 ){
      return true;
    }
  }

  calcCountdown(){
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
  }
  
  displayCountdown(countdownAmount, format){
    var countdownAsText = countdownAmount.toString();

    if (countdownAsText.length === 1) {
      countdownAsText = '0' + countdownAsText;
    }
    $('.time-left__num').first().text(countdownAsText[0]);
    $('.time-left__num').last().text(countdownAsText[1]);
    $('.js-ticket-contdown__unit').text(format);
  }

}
export default new Countdown();