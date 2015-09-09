var _ = require('underscore');
var fs = require('fs');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "platiniumcab.dev@gmail.com",
        pass: "louezmoi,,"
    }
});



var bodyParse = require('body-parser');


exports.mailer = function(app){
    app.use(bodyParse.json());
    app.post('/contact', function(req, res){

        var mail = req.body.email;
        var message = req.body.message;


        var mailOptions = {
            from: '<' + req.body.email + '>', // sender address
            to: 'mac95170@gmail.com, kamel.plc75@gmail.com, samy26k@yahoo.fr'+ ',' + mail , // list of receivers
            subject: 'Formulaire de CONTACT', // Subject line
            html: '<br/> '
            + '<hr><br/><br/><br/>'
            + 'De :' + '<span style="font-weight: bold;">' + mail + '</span>'
            +'<br/><br/><br/><br/>'
            + '-------- (Message) ----- : <br/><br/><br/> '  + message + '<br><br>'

            + '<br> <hr> '
            + 'Platiniumcab.com'
        };


        transporter.sendMail(mailOptions, function(error, info){

            if(error){
                console.log('erreur lors de l\'envoi...');
                console.log(error);
            }else{

                console.log('Message sent: ' + info.response);
            }

        })
        console.log(req.body);
        res.end();
    })


}

