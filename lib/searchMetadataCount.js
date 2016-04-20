
var request = require('request');

function searchMetadataCount(type, storeUrl, auth, query, callback) {

    request.get({
        
        url: storeUrl + '/' + type + '/search/metadata/count',
        qs: query,
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

module.exports = searchMetadataCount

