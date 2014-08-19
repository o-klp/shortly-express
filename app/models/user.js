var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',

  initialize: function(){
    this.on('creating', this.hashThis, this);
    this.on('checkPass', this.comparePassword, this);
  },

  hashThis: function() {
    // hashes password but does not salt (first null is salt)
    var cipher = Promise.promisify(bcrypt.hash);

    return cipher(this.get('password'), null, null)
      .bind(this)
      .then(function(hash) {
        console.log("saved password as ", hash);
        this.set('password', hash);
      });
  },

  comparePassword: function(password, req, res) {
    var self = this;
    bcrypt.compare(password, this.get('password'), function(err, result) {
      if(result){
        req.session.regenerate(function(){
          console.log('regenerating session');
          req.session.user = self.get('username');
          res.redirect('/');
        });
      }else{
        res.redirect('/signup');
      }
    });
  },

  hasTimestamps: true
});

module.exports = User;
