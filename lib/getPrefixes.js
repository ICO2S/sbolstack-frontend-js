
var request = require('request');

function getPrefixes(storeUrl, auth, callback) {

    request.get({
        
        url: storeUrl + '/prefixes',
        protocol: 'http:',
        json: true,
        auth: auth

    }, function(err, response, body) {

        if(err || response.statusCode >= 300) {
            callback(err || new Error('HTTP ' + response.statusCode));
        } else {
            callback(null, body)
        }
    });

}

module.exports = getPrefixes


