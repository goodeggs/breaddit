isAdminById=function(userId){
  var user = Meteor.users.findOne(userId);
  return !!(user && isAdmin(user));
};
isAdmin=function(user){
  user = (typeof user === 'undefined') ? Meteor.user() : user;
  return !!user && !!user.isAdmin;
};
isInvited=function(user){
  if(!user || typeof user === 'undefined')
    return false;
  return isAdmin(user) || !!user.isInvited;
};
adminUsers = function(){
  return Meteor.users.find({isAdmin : true}).fetch();
};
getUserName = function(user){
  return user.username || getProperty(user, 'services.google.name');
};
getDisplayName = function(user){
  return (user.profile && user.profile.name) ? user.profile.name : user.username;
};
getDisplayNameById = function(userId){
  return getDisplayName(Meteor.users.findOne(userId));
};
getProfileUrl = function(user) {
  return Meteor.absoluteUrl()+'users/' + slugify(getUserName(user));
};
getProfileUrlById = function(id){
  return Meteor.absoluteUrl()+'users/'+ id;
};
getProfileUrlBySlug = function(slug) {
  return Meteor.absoluteUrl()+'users/' + slug;
};
getGoogleName = function(user){
  // return twitter name provided by user, or else the one used for twitter login
  if(checkNested(user, 'profile', 'google')){
    return user.services.google.name;
  }else if(checkNested(user, 'services', 'google', 'name')){
    return user.services.google.name;
  }
  return null;
};
getGitHubName = function(user){
  // return twitter name provided by user, or else the one used for twitter login
  if(checkNested(user, 'profile', 'github')){
    return user.profile.github;
  }else if(checkNested(user, 'services', 'github', 'screenName')){ // TODO: double-check this with GitHub login
    return user.services.github.screenName;
  }
  return null;
};
getGoogleNameById = function(userId){
  return getGoogleName(Meteor.users.findOne(userId));
};
getSignupMethod = function(user){
  if(user.services && user.services.google){
    return 'google';
  }else{
    return 'regular';
  }
};
getEmail = function(user){
  if(user.services && user.services.email){
    return user.services.google.email;
  }else{ 
    return getProperty(user, 'services.google.email'); 
  }
};
getAvatarUrl = function(user){
  if(getSignupMethod(user)=='google'){
    return user.services.google.picture;
  }else{
    return Gravatar.getGravatar(user, {
      d: 'http://demo.telesc.pe/img/default_avatar.png',
      s: 80
    });
  }
};
getCurrentUserEmail = function(){
  return Meteor.user() ? getEmail(Meteor.user()) : '';
};
userProfileComplete = function(user) {
  return !!getEmail(user);
};

findLast = function(user, collection){
  return collection.findOne({userId: user._id}, {sort: {createdAt: -1}});
};
timeSinceLast = function(user, collection){
  var now = new Date().getTime();
  var last = findLast(user, collection);
  if(!last)
    return 999; // if this is the user's first post or comment ever, stop here
  return Math.abs(Math.floor((now-last.createdAt)/1000));
};
numberOfItemsInPast24Hours = function(user, collection){
  var mDate = moment(new Date());
  var items=collection.find({
    userId: user._id,
    createdAt: {
      $gte: mDate.subtract('hours',24).valueOf()
    }
  });
  return items.count();
};
getUserSetting = function(setting, defaultValue, user){
  var user = (typeof user == 'undefined') ? Meteor.user() : user;
  var defaultValue = (typeof defaultValue == "undefined") ? null: defaultValue;
  var settingValue = getProperty(user.profile, setting);
  return (settingValue == null) ? defaultValue : settingValue;
};
getProperty = function(object, property){
  // recursive function to get nested properties
  var array = property.split('.');
  if(array.length > 1){
    var parent = array.shift();
    // if our property is not at this level, call function again one level deeper if we can go deeper, else return null
    return (typeof object[parent] == "undefined") ? null : getProperty(object[parent], array.join('.'));
  }else{
    // else return property
    return object[array[0]];
  }
};
