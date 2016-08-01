
var request = require('request');

function searchMetadata(type, storeUrl, auth, query, callback) {

    request.post({
        
        url: storeUrl + '/' + type + '/search/metadata',
        protocol: 'http:',
        json: true,
        body: query,
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

