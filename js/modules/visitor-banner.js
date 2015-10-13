import _ from '../../bower_components/lodash-compat/lodash.min';

var visitors = {
  'product-hunt' : {
    message : 'Welcome Product Hunters get 20% off with code hunt20'
  },
  'lanyrd' : {
    message : 'Welcome Lanyrd get 10% off with code lanyrd10'
  }
};

var visitor = {
  init: function(){
  },
  getQueryParams: function(variable) {
    var query = window.location.search.substring(1);
    var allParams = query.split("&");
    return _.object(
        _.map(allParams, function(value){
            var item = value.split('=');
            return [item[0], item[1]];
        })
    );
  },
  isSpecialGuest: function(visitor){
    return visitors[visitor] || false;
  },
  findValues: function(){
    var params = this.getQueryParams();
    var visitor = params['visitor'];
    if(this.isSpecialGuest(visitor)){
      return visitors[visitor];
    }
  },
  displayBanner: function(){
    var visitorDetails = this.findValues();
    if(visitorDetails) {
      $('body').prepend(`<div class="welcome-banner">${visitorDetails.message} </div>`);
    }
  }
}
export default visitor;