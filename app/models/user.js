var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var cryptThis = function(password, userContext) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      userContext.password = hash;
    });
  });
};


var User = db.Model.extend({
  tableName: 'users',

  hashThis: function() {
    var salt = bcrypt.genSalt(10, function(err, salt) { return salt});
    return Promise.promisify(bcrypt.hash)(this.password, salt, null)
                  .bind(this)
                  .then(function(hash) {
                    this.set('password', hash);
                  });
  },

  initialize: function(){
    this.on('creating', this.hashThis, this);
  },

  hasTimestamps: true
});

module.exports = User;
