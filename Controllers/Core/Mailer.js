var nodemailer = require('nodemailer');

var config = require('../../app/ConfigFiles/config.json');

var mail = {
    passwordSentToMail: function(subject, toEmail, password) {
              sendMail(toEmail,subject,password); 
    },

    userOTPSentToMail: function(subject, toEmail, otp){
        sendOTPTOMail(toEmail,subject,otp);
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
        function sendOTPTOMail(toEmail,subject,otp){
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
                text: 'Your OTP is.' + otp
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