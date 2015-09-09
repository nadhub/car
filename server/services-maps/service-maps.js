var distance = require('google-distance');
var gmApi = require('googlemaps'),
    config = require('../config/googleMaps-conf');

var gm = new gmApi(config);

exports.distance = function(app){

    app.get('/dest', function(req, res) {

        gm.distance({origins: req.param('depart'),
                    destinations: req.param('destination')
            },
            function (err, response) {

                if(err) {
                    res.json(err)
                }else
                res.json(response)

        });
    });
}