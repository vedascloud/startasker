var nodemailer = require('nodemailer');
var config = require('../../app/ConfigFiles/config.json');
var fs = require('fs');

var mail = {
    passwordSentToMail: function(subject, toEmail, password) {
              sendMail(toEmail,subject,password); 
    },

    userOTPSentToMail: function(subject, toEmail, otp){
        fs.readFile('./app/ConfigFiles/Startasker-email.html', function (err, data) {
            if (!err) {
                var str = data.toString();
                var html = str.replace("%s", otp);
                sendOTPTOMail(toEmail,subject,html); 
            }
            else {
                console.log(err);
            }
        });       
    },
    userReportTaskSentToMail:function(subject,toEmail,message){
        sendReportTOMail(toEmail,subject,message);
    }
}

    function sendMail(toEmail,subject,password){
        var transporter = nodemailer.createTransport({
                name:'SMTP',
                host: 'mail.startasker.com',
                port: 465,
                secure :true,
                auth: {		
                user: config.authMail,
                pass: config.authMailPassword
                }
        }); 
        var mailOptions = {
            from: config.fromMail,
            to: toEmail,
            subject: subject,
            text: password
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
    
            } else {
                console.log('Email sent: ' + info.response);
    
            }
        });
    }
        function sendOTPTOMail(toEmail,subject,html){
            var transporter = nodemailer.createTransport({
                //service: config.mailService,
                name:'SMTP',
                host: 'mail.startasker.com',
                port: 465,
                secure :true,
                auth: {		
                user: config.authMail,
                pass: config.authMailPassword
                }
            }); 
            var mailOptions = {
                from: config.fromMail,
                to: toEmail,
                subject: subject,
                html: html
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
        
                } else {
                    console.log('Email sent: ' + info.response);
        
                }
            });
            
}
function sendReportTOMail(toEmail,subject,message){
    var transporter = nodemailer.createTransport({
        name:'SMTP',
        host: 'mail.startasker.com',
        port: 465,
        secure :true,
        auth: {
            user: config.authMail,
            pass: config.authMailPassword
        }
    });
    var mailOptions = {
        from: config.fromMail,
        to: config.fromMail,
        subject: subject,
        text: message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);

        } else {
            console.log('Email sent: ' + info.response);

        }
    });
}

module.exports = mail;