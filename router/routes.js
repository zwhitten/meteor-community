Router.configure({
    layoutTemplate: 'masterLayout'
});

Router.route('/', { name: 'home'});

Router.route('/about', {
  name: 'about',
  template: 'about'
});

Router.route('/profiles/:_id', {
  name: 'profile.details',
  controller: 'ProfileController'
});

Router.route('/api/profiles/name/:_id', function() {
  var request= this.request;
  var response=this.response;
  response.end(ProfilesCollection.findOne({
    _id: this.params._id
  }).name);
}, {
  where: 'server'
});

Router.route('/api/find/profiles', {
    where: 'server'
  })
  .get(function() {
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(JSON.stringify(
      ProfilesCollection.find().fetch())
    );
  });
