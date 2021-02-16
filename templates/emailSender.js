var nodemailer = require("nodemailer");
var ejs = require('ejs');
var smtpTransport = require('nodemailer-smtp-transport');
var fs = require('fs');
var cheerio = require("cheerio");
var pretty = require("pretty");

var template = fs.readFileSync('template.html',{encoding:'utf-8'});


var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'acciom123@gmail.com',
    pass: 'Password@123'
  }
}));

function sendMail(cb) {
    var user = {firstName : 'Khazi', lastName: 'T'};

    var subject = ejs.render('Hello <%= firstName %>', user);
    var text = ejs.render(template, user);


    var options = {
        from: 'acciom123@gmail.com',
        replyTo: 'acciom123@gmail.com',
        to: 'khazitest@gmail.com',
        subject: subject,
        html: text
    };

    transporter.sendMail(options, cb);

}

sendMail();
