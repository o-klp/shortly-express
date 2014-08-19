Shortly.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$el = options.el;
  },

  routes: {
    '':       'index',
    'create': 'create',
  },

  swapView: function(view){
    this.$el.html(view.render().el);
  },

  loginView: function() {
    this.$el.html('login page');
    console.log('loginView');
  },

  index: function(){
    var links = new Shortly.Links();
    var linksView = new Shortly.LinksView({ collection: links });
    this.swapView(linksView);
  },

  login: function(){
    // var links = new Shortly.Links();
    // var linksView = new Shortly.LinksView({ collection: links });
    console.log('login');
    this.loginView();
  },

  create: function(){
    this.swapView(new Shortly.createLinkView());
  }
});
