var mongoose = require("mongoose");
var mongoCfg = require("./config").mongo;

var userSchema = {
  name:  'string',
  email: 'string',
  message:  'string'
};

mongoose.connect();

var userSchema = new mongoose.Schema(userSchema);
var User = mongoose.model('Users', userSchema);

module.exports = User;
