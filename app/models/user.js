var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',

  hashThis: function() {
    // hashes password but does not salt (first null is salt)
    console.log("when initializing, pw is ", this.get('password'));
    return Promise.promisify(bcrypt.hash)(this.get('password'), null, null)
                  .bind(this)
                  .then(function(hash) {
                    console.log("saved password as ", hash);
                    this.set('password', hash);
                  });
  },

  initialize: function(){
    this.on('creating', this.hashThis, this);
  },

  hasTimestamps: true
});

module.exports = User;
