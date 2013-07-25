
/*
 * GET home page.
 */


var nodemailer = require("nodemailer");
var mailCfg = require("../config").mail;
var receiver = require("../config").receiver;

var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: mailCfg.user,
       pass: mailCfg.password
   }
});

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.requestPost = function(req, res) {
	var request = {
		name: req.body.name | "",
		email: req.body.email | "",
		message: req.body.message | ""
	};

	res.send(request);

};

exports.send = function(req, res) {
	smtpTransport.sendMail({
	   from: "Arecord.us <nodejs@arecord.us>", // sender address
	   to: receiver,
	   subject: "Hello ✔", // Subject line
	   text: "Hello world ✔" // plaintext body
	}, function(error, response){
	   if(error){
	       console.log(error);
	   }else{
	       console.log("Message sent: " + response.message);
	       res.send(response.message);
	   }
	});
};