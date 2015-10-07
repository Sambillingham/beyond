class Share {
    popItUp(platform, message, url) {
      var popUrl,
          newWindow;

      if( platform == 'twitter'){
          popUrl = 'http://twitter.com/home?status=' + encodeURI(message) + '+' + url;

      } else if(platform == 'facebook'){
          popUrl = 'http://www.facebook.com/share.php?u' + url + '&amp;title=' + encodeURI(message);
      }
      newWindow = window.open(popUrl,'name','height=500,width=600');
      if (window.focus) { newWindow.focus(); }
      return false;
    }
}
export default new Share();