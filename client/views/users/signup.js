Template.signup.events({
    'click input[type=submit]': function(event){
      event.preventDefault();
      var username = $('#username').val();
      var email = $('#email').val();
		//var email = email.split('@').slice(1);
		//var allowedDomains = ['goodeggs.com'];
	
      var password = $('#password').val();
      if(!username || !email || !password){
        throwError(i18n.t('Please use goodeggs email'));
        return false;
      }

		/*$('button').on('click', function(){
		    str = $('input').val();
		    str = str.split('@').slice(1);
    
		    var allowedDomains = [ 'steve.com', 'Pete.com', 'jack.com', 'John.com' ];
    
		    if ($.inArray(str[0], allowedDomains) !== -1) {
		        alert(str + ' is allowed');
		    }else{
		        alert('not allowed');
		    }(!username || !email || !password)*/

		
      Accounts.createUser({
          username: username
        , email: email  
        , password: password
      }, function(err){
        if(err){
          console.log(err);
        }else{
          Router.go('/');
        }  
      });
  },

  'click #signin': function(){
      Router.go('/signin');
  },

  'click .twitter-button': function(){
    Meteor.loginWithTwitter(function(){
      Router.go('/');
    });
  }
});