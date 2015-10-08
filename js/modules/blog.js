var blog = {
  filterBy: function(filter,el){
    console.log(el);
    if($(el).hasClass('blog__nav__link--selected') ){
      $('.js-filter-blog').removeClass('blog__nav__link--selected');
      $('.js-post-preview').fadeOut(300).promise().done( function(){
        $('.js-post-preview').fadeIn(400);
      })
    } else {
      $('.js-filter-blog').removeClass('blog__nav__link--selected');
      $(el).addClass('blog__nav__link--selected');
      $('.js-post-preview').fadeOut(300).promise().done( function(){
        $('*[data-category="'+filter+'"]').fadeIn(400);
      });
    }
  }
}
export default blog;