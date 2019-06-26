var nodemailer = require("nodemailer");
var ejs = require('ejs');
var smtpTransport = require('nodemailer-smtp-transport');
var fs = require('fs');

var template = fs.readFileSync('template.html',{encoding:'utf-8'});


var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: '<SENDEREMAIL>',
    pass: '<YOURPASSWORD>'
  }
}));

function sendMail(cb) {
    var user = {firstName : 'John', lastName: 'Doe'};

    var subject = ejs.render('Hello <%= firstName %>', user);
    var text = ejs.render(template, user);


    var options = {
        from: '<FROMEMAIL>',
        replyTo: '<REPLAYEMAIL>',
        to: '<TOEMAIL>',
        subject: subject,
        html: text
    };

    transporter.sendMail(options, cb);

}

sendMail();
