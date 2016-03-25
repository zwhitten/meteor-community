ProfileController = RouteController.extend({
  layoutTemplate: 'profileLayout',
  waitOn: function(){
    Meteor.subscribe("profile", this.params._id);
  },
  template: 'profileDetail',
  yieldTemplates: {
    'profileDetailLeft': {
      to: 'left'
    }
  },
  onRun: function(){
    ProfilesCollection.update({
      _id: this.params._id
    }, {$inc: {views: 1}});
    this.next();
  },
  onBeforeAction: function() {
    if(!Meteor.userId()){
      this.render('membersonly');
    } else {
      this.next();
    }
  },
  data: function(){
    return ProfilesCollection.findOne({_id: this.params._id});
  }
});
