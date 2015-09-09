var _ = require('underscore');
var fs = require('fs');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: require('./config/node-mail-conf')
});



var bodyParse = require('body-parser');


exports.mailer = function(app){
    app.use(bodyParse.json());
    app.post('/mailer', function(req, res){

        var name = req.body.nom;
        var mail = req.body.email;
        var tel = req.body.tel;
        var date = new Date(req.body.date);
        var price = req.body.price;
        var pricePerKm = req.body.pricePerKm;
        var distance = req.body.distance;
        var hour = req.body.hour;
        var minute = req.body.minute;

        var tabFinalDate = (date.getUTCDate() + 1)  +'-' + (date.getUTCMonth() + 1) + '-' + date.getUTCFullYear();


        var mailOptions = {
            from: req.body.nom + '<' + req.body.email + '>', // sender address
            to: 'mail.pour.dev@gmail.com',
            subject: 'Demande de location de voiture',
            html: '<b>Bonjour, voici les détails de la location</b> <br><br> '
            + '<hr><br/>'
            +'<table cellpadding="10" cellspacing="0" style="width: 100%; margin: 1em 25px; text-align: left;">'
            +'<tr style="background-color:#d7e4f4;">'
            + '<td style="font-weight: bold;">Nom du client:</td><td style="font-weight: bold; text-transform: uppercase;">' + name + '</td>'
            +'</tr>'
            +'<tr style="background-color:#9AA4B2;">'
            + '<td style="font-weight: bold;">Email du client:</td><td>' + mail + '</td>'
            +'</tr>'
            +'<tr style="background-color:#d7e4f4;">'
            + '<td style="font-weight: bold;">Tél du client:</td><td>' + tel + '</td>'
            +'</tr>'
            +'<tr style="background-color:#9AA4B2;">'
            + '<td style="font-weight: bold;">Date de réservation:</td><td>' + tabFinalDate + '</td>'
            +'</tr>'
            +'<tr style="background-color:#d7e4f4;">'
            + '<td style="font-weight: bold;">Heure de réservation:</td><td>' + hour + ' :' + minute  + '</td>'
            +'</tr>'
            +'<tr style="background-color:#9AA4B2;">'
            + '<td style="font-weight: bold; color: #ffffff; text-transform: uppercase; text-justify: auto;">Info du trajet</td><td></td>'
            +'</tr>'
            +'<tr style="background-color:#d7e4f4;">'
            + '<td style="font-weight: bold;">Départ:</td><td>' + req.body.departReserve + '</td>'
            +'</tr>'
            +'<tr style="background-color:#9AA4B2;">'
            + '<td style="font-weight: bold;">Destinatoin:</td><td>' + req.body.destinationReserve + '</td>'
            +'</tr>'
            +'<tr style="background-color:#d7e4f4;">'
            + '<td style="font-weight: bold;">Distance:</td><td>' + distance + '</td>'
            +'</tr>'
            +'<tr style="background-color:#9AA4B2;">'
            + '<td style="font-weight: bold;">Prix  km:</td><td>'  + pricePerKm +  ' €' + '</span> </td>'
            +'</tr>'
            +'<tr style="background-color:#d7e4f4;">'
            + '<td style="font-weight: bold;">Prix total :</td><td>' + price + '</td>'
            +'</tr>'
            +'</table>'
        };


        transporter.sendMail(mailOptions, function(error, info){

            if(error){
                console.log('erreur lors de l\'envoi...');
                console.log(error);
            }else{
                nom = req.body.nom;
                mail = req.body.email;
                console.log('Message sent: ' + info.response);
            }

        })


        var mailOptionsClient = {
            from: 'Site-Web ' + '<' + req.body.email + '>', // sender address
            to: mail, // list of receivers
            subject: 'Votre réservation', // Subject line
            html: '<b>Bonjour, ' + name + '</b> <br><br> '
            + '<hr><br/>'
            +'<table cellpadding="10" cellspacing="0" style="width: 100%; margin: 1em 25px; text-align: left;">'
            +'<tr style="background-color:#d7e4f4;">'
            + '<td style="font-weight: bold;">Nom du client:</td><td style="font-weight: bold; text-transform: uppercase;">' + name + '</td>'
            +'</tr>'
            +'<tr style="background-color:#9AA4B2;">'
            + '<td style="font-weight: bold;">Email du client:</td><td>' + mail + '</td>'
            +'</tr>'
            +'<tr style="background-color:#d7e4f4;">'
            + '<td style="font-weight: bold;">Tél du client:</td><td>' + tel + '</td>'
            +'</tr>'
            +'<tr style="background-color:#9AA4B2;">'
            + '<td style="font-weight: bold;">Date de réservation:</td><td>' + tabFinalDate + '</td>'
            +'</tr>'
            +'<tr style="background-color:#d7e4f4;">'
            + '<td style="font-weight: bold;">Heure de réservation:</td><td>' + hour + ' :' + minute  + '</td>'
            +'</tr>'
            +'<tr style="background-color:#9AA4B2;">'
            + '<td style="font-weight: bold; color: #ffffff; text-transform: uppercase; text-justify: auto;">Info du trajet</td><td></td>'
            +'</tr>'
            +'<tr style="background-color:#d7e4f4;">'
            + '<td style="font-weight: bold;">Départ:</td><td>' + req.body.departReserve + '</td>'
            +'</tr>'
            +'<tr style="background-color:#9AA4B2;">'
            + '<td style="font-weight: bold;">Destinatoin:</td><td>' + req.body.destinationReserve + '</td>'
            +'</tr>'
            +'<tr style="background-color:#d7e4f4;">'
            + '<td style="font-weight: bold;">Distance:</td><td>' + distance + '</td>'
            +'</tr>'

            +'<tr style="background-color:#d7e4f4;">'
            + '<td style="font-weight: bold;">Prix total :</td><td>' + price + '</td>'
            +'</tr>'
            +'</table>'
        };


        transporter.sendMail(mailOptionsClient, function(error, info){

            if(error){
                console.log('erreur lors de l\'envoi...');
                console.log(error);
            }else{
                nom = req.body.nom;
                mail = req.body.email;
                console.log('Message sent: ' + info.response);
            }

        })



        console.log(req.body);
        res.end();
    })


}

