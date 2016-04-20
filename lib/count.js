
var request = require('request');

function count(type, storeUrl, auth, callback) {

    request.get({
        
        url: storeUrl + '/' + type + '/count',
        protocol: 'http:',
        auth: auth

    }, function(err, response, body) {

        if(err || response.statusCode >= 300) {
            callback(err || new Error('HTTP ' + response.statusCode));
        } else {
            callback(null, parseInt(body));
        }
    });

}

module.exports = count


