
var Store = require('./store')

var count = require('./count')
var getSBOL = require('./getSBOL')
var getMetadata = require('./getMetadata')
var searchMetadata = require('./searchMetadata')
var searchMetadataCount = require('./searchMetadataCount')
var searchSBOL = require('./searchSBOL')
var getPrefixes = require('./getPrefixes')
var doSparql = require('./sparql')
var doUpload = require('./upload')

var request = require('request')

function StackFrontend(backendUrl, backendUser, backendPassword) {

    this.backendUrl = backendUrl

    if(arguments.length > 1) {

        this.auth = {
            user: backendUser,
            pass: backendPassword
        }

    }
}

module.exports = StackFrontend

StackFrontend.prototype = {

    getStore: getStore,
    getDefaultStore: getDefaultStore,
    createStore: createStore,
    getPrefixes: getStackPrefixes

}

function getStore(storeName) {
    return new Store(this.backendUrl + '/store/' + storeName, this.auth)
}

function getDefaultStore() {
    return new Store(this.backendUrl, this.auth)
}

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

function getStackPrefixes(callback) {
    getPrefixes(this.backendUrl, this.auth, callback)
}

function upload(data, callback) {
    doUpload(this.backendUrl, this.auth, data, callback)
}



