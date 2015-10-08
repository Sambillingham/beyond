var blog = {
  filterBy: function(filter,el){
    if($(el).hasClass('blog__nav__link--selected') ){
      $('.js-filter-blog').removeClass('blog__nav__link--selected');
      $('.js-post-preview').fadeOut(300).promise().done( function(){
        $('.post-preview').removeClass('post-preview--last');
        $('.js-post-preview').fadeIn(400);
      })
    } else {
      $('.js-filter-blog').removeClass('blog__nav__link--selected');
      $(el).addClass('blog__nav__link--selected');
      $('.js-post-preview').fadeOut(300).promise().done( function(){
        $('*[data-category="'+filter+'"]').fadeIn(400);
        $('.post-preview:visible:last').addClass('post-preview--last');
      });
    }
  },
  openSharePopup: function(platform, message, url) {
    var popUrl,
        newWindow;

    if( platform == 'twitter'){
        popUrl = 'http://twitter.com/home?status=' + encodeURI(message) + '+' + url;

    } else if(platform == 'facebook'){
        popUrl = 'http://www.facebook.com/share.php?u' + url + '&amp;title=' + encodeURI(message);
    }
    newWindow = window.open(popUrl,'_blank','height=500,width=600');
    if (window.focus) { newWindow.focus(); }
    return false;
  }
}
export default blog;