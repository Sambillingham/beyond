import _ from '../../bower_components/lodash-compat/lodash.min';

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