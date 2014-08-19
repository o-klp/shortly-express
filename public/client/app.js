window.Shortly = Backbone.View.extend({
  template: Templates['layout'],

  events: {
    'click li a.index':  'renderIndexView',
    'click li a.create': 'renderCreateView',
    'click li a.logout': 'logUserOut'
  },

  initialize: function(){
    console.log( 'Shortly is running' );
    $('body').append(this.render().el);

    this.router = new Shortly.Router({ el: this.$el.find('#container') });
    this.router.on('route', this.updateNav, this);

    Backbone.history.start({ pushState: true });
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  renderIndexView: function(e){
    e && e.preventDefault();
    this.router.navigate('/', { trigger: true });
  },

  logUserOut: function(e){
    e && e.preventDefault();
    window.location = "http://127.0.0.1:3000/logout";
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    this.router.navigate('/create', { trigger: true });
  },

  updateNav: function(routeName){
    this.$el.find('.navigation li a')
      .removeClass('selected')
      .filter('.' + routeName)
      .addClass('selected');
  }

});
