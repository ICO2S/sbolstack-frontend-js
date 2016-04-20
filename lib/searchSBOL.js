
var SBOLDocument = require('sboljs');

var request = require('request');

function searchSBOL(type, storeUrl, auth, query, callback) {

    request.get({
        
        url: storeUrl + '/' + type + '/search/sbol',
        qs: query,
        protocol: 'http:',
        auth: auth

    }, function(err, response, body) {

        if(err || response.statusCode >= 300) {
            callback(err || new Error('HTTP ' + response.statusCode));
        } else {

            SBOLDocument.loadRDF(body, function(err, sbol) {

                if(err)
                    return callback(err);

                callback(null, sbol);
            });
        }
    });

}

module.exports = searchSBOL

