/**
 * @overview
 *
 * @author
 * @version 2013/07/25
 */

var cfg = {
  "mongo": process.env.mongo,
  "mandrill": process.env.mandrill,
  "mail": {
    "user": process.env.emailuser,
    "password" : process.env.emailpwd
  },
  receiver: process.env.receiver
};

module.exports = cfg;

