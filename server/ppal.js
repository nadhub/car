'use strict';

var paypal = require('paypal-rest-sdk');
var config = require('./config/paypal-conf');


paypal.configure(config);

exports.token = function(req,res){



    paypal.generate_token(function(error, token){
        if(error){
            console.error(error);
        } else {
            console.log(token);
            res.render('index');
        }
    });
}

exports.paymentWithCard = function(req, res){


    var payment_details = {
        "intent": "sale",
        "payer": {
            "payment_method": "credit_card",
            "funding_instruments": [{
                "credit_card": {
                    "type": "visa",
                    "number": "4417119669820331",
                    "expire_month": "11",
                    "expire_year": "2018",
                    "cvv2": "874",
                    "first_name": "Joe",
                    "last_name": "Shopper"
                    }}]},
        "transactions": [{
            "amount": {
                "total": "7.47",
                "currency": "EUR",
                "details": {
                    "subtotal": "7.41",
                    "tax": "0.03",
                    "shipping": "0.03"}},
            "description": "This is the payment transaction description." }
        ]};


    paypal.payment.create(payment_details, function(error, payment){
        if(error){
            console.error(error);
        } else {
            console.log(payment);
            res.json(payment);
        }
    });



}



