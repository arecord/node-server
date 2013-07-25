
/*
 * GET home page.
 */

var config = require("../config");
var mailCfg = config.mail;
var receiver = JSON.parse(config.receiver);
var mandrill = require('node-mandrill')(config.mandrill);

var sendMail = function (to, subject, message) {

	//send an e-mail to jim rubenstein
	mandrill('/messages/send', {
	    message: {
	        to: to,
	        from_email: "nodejs@arecord.us",
	        subject: subject, // Subject line
	        text: message
	    }
	}, function(error, response)
	{
	    //uh oh, there was an error
	    if (error) console.log( JSON.stringify(error) );

	    //everything's good, lets see what mandrill said
	    else console.log(response);
	});

};

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
	var subject = "[Arecord.us]" + request.email + "send a request";

	sendMail(receiver, subject, message);

};