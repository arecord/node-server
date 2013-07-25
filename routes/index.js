
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
		name: req.body.name || "",
		email: req.body.email || "",
		message: req.body.message || ""
	};

	res.send(request);

	if (request.email == "") {
		return res.send("Eamil Error");
	}

	res.send("POST success");
	var message = request.email + "<br/>" + request.name + "<br/>" + request.message;

	smtpTransport.sendMail({
	   from: "Arecord.us <nodejs@arecord.us>", // sender address
	   to: receiver,
	   subject: "[Arecord.us]" + request.email + "send a request", // Subject line
	   text: message
	}, function(error, response){
	   if(error){
	       console.log(error);
	   }else{
	       console.log(message);
	   }
	});

};