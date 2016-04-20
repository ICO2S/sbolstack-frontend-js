
var request = require('request');

var SBOLDocument = require('sboljs')

function getSBOL(type, storeUrl, auth, prefix, uri, callback) {

    var url
   
    if(prefix)
        url = storeUrl + '/' + type + '/' + encodeURIComponent(prefix) + '/' + encodeURIComponent(uri) + '/sbol'
    else
        url = storeUrl + '/' + type + '/' + encodeURIComponent(uri) + '/sbol'

    request.get({
        
        url: url,
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

module.exports = getSBOL

