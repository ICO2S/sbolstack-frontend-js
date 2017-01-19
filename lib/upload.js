
var request = require('request');

function upload(storeUrl, auth, data, callback) {

    if(typeof data !== 'string')
        data = data.serializeXML()

    request.post({
        
        url: storeUrl,
        protocol: 'http:',
        auth: auth,
        body: data,
        headers: {
            'content-type': 'application/rdf+xml'
        }

    }, function(err, response, body) {

        if(err || response.statusCode >= 300) {
            callback(err || new Error('HTTP ' + response.statusCode));
        } else {
            callback(null, body);
        }
    });

}

module.exports = upload

