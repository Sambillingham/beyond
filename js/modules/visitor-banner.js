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
  }
}
export default visitor;