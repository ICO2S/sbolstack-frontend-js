
var request = require('request');

function createStore(storeName, callback) {

    request.post({
        
        url: this.backendUrl + '/store/create',
        form: {
            storeName: storeName
        },
        protocol: 'http:',
        auth: this.auth

    }, (err, response, body) => {

        if(err || response.statusCode >= 300) {
            callback(err || new Error('HTTP ' + response.statusCode));
        } else {
            callback(null, this.getStore(storeName))
        }
    });

}

module.exports = createStore


