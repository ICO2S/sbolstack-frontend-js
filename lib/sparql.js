
var request = require('request');

function sparql(storeUrl, auth, query, accept, callback) {

    var opts = {
        
        url: storeUrl + '/sparql',
        qs: {
            query: query
        },
        auth: auth
    }

    if(accept) {
        opts.headers = {
            accept: accept
        }
    }

    request.get(opts, function(err, response, body) {

        if(err || response.statusCode >= 300) {
            callback(err || new Error('HTTP ' + response.statusCode));
        } else {

            console.log(response.headers['content-type'])

            if(response.headers['content-type'].indexOf('json') !== -1)
                body = JSON.parse(body)

            callback(null, body)
        }
    });

}

module.exports = sparql


