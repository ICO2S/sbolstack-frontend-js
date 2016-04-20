
var request = require('request');

function searchMetadata(type, storeUrl, auth, query, callback) {

    request.get({
        
        url: storeUrl + '/' + type + '/search/metadata',
        qs: query,
        protocol: 'http:',
        json: true,
        auth: auth

    }, function(err, response, body) {

        if(err || response.statusCode >= 300) {
            callback(err || new Error('HTTP ' + response.statusCode));
        } else {
            callback(null, body);
        }
    });

}

module.exports = searchMetadata

