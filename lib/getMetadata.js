
var request = require('request');

function getMetadata(type, storeUrl, auth, prefix, uri, callback) {

    var url
   
    if(prefix)
        url = storeUrl + '/' + type + '/' + encodeURIComponent(prefix) + '/' + encodeURIComponent(uri) + '/metadata'
    else
        url = storeUrl + '/' + type + '/' + encodeURIComponent(uri) + '/metadata'

    request.get({
        
        url: url,
        protocol: 'http:',
        json: true,
        auth: auth

    }, function(err, response, body) {

        if(err || response.statusCode >= 300) {
            callback(err || new Error('HTTP ' + response.statusCode));
        } else {

            if(err)
                return callback(err);

            callback(null, body);
        }
    });

}

module.exports = getMetadata

