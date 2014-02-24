// super, super simple
Gravatar = {
  getGravatar: function(user, options) {
    if(user.email_hash){
      var options = options || {};

      var protocol = options.secure ? 'https' : 'http';
      delete options.secure;
      var hash = user.email_hash;
      var url = protocol + '://www.gravatar.com/avatar/' + hash;

      var params = _.map(options, function(val, key) { return key + "=" + val}).join('&');
      if (params !== '')
      url += '?' + params;
    
      return url;
    
    }else if(user.services && user.services.google){
      return user.services.google.picture; //for the oauth-login avatar, diff for diff oauth, maybe it could be better
    }
  }
}