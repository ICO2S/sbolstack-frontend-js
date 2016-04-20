
var Store = require('./store')

var count = require('./count')
var getSBOL = require('./getSBOL')
var getMetadata = require('./getMetadata')
var searchMetadata = require('./searchMetadata')
var searchMetadataCount = require('./searchMetadataCount')
var searchSBOL = require('./searchSBOL')
var getPrefixes = require('./getPrefixes')
var doSparql = require('./sparql')
var createStore = require('./createStore')
var doUpload = require('./upload')

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
    createStore: createStore,

    upload: upload,

    sparql: sparql,

    countComponents: countComponents,
    countSequences: countSequences,
    countModules: countModules,
    countCollections: countCollections,

    searchComponentSBOL: searchComponentSBOL,
    searchComponentMetadata: searchComponentMetadata,
    searchComponentMetadataCount: searchComponentMetadataCount,

    getComponentSBOL: getComponentSBOL,
    getComponentMetadata: getComponentMetadata,

    getPrefixes: getStackPrefixes

}

function getStore(storeName) {
    return new Store(this.backendUrl + '/store/' + storeName, this.auth)
}

function sparql(query, accept, callback) {

    var args = [].slice.call(arguments, 0)

    if(args.length < 3) {
        query = args[0]
        callback = args[1]
        accept = null
    }

    doSparql(this.backendUrl, this.auth, query, accept, callback)
}

function countComponents(callback) {
    count('component', this.backendUrl, this.auth, callback);
}

function countSequences(callback) {
    count('sequence', this.backendUrl, this.auth, callback);
}

function countModules(callback) {
    count('module', this.backendUrl, this.auth, callback);
}

function countCollections(callback) {
    count('collection', this.backendUrl, this.auth, callback);
}

function searchComponentSBOL(criteria, callback) {
    searchSBOL('component', this.backendUrl, this.auth, criteria, callback);
}

function searchComponentMetadata(criteria, callback) {
    searchMetadata('component', this.backendUrl, this.auth, criteria, callback);
}

function searchComponentMetadataCount(criteria, callback) {
    searchMetadataCount('component', this.backendUrl, this.auth, criteria, callback);
}

function getComponentSBOL(prefix, uri, callback) {

    var args = [].slice.call(arguments, 0)

    if(args.length < 3) {
        uri = args[0]
        callback = args[1]
        prefix = null
    }

    getSBOL('component', this.backendUrl, this.auth, prefix, uri, function(err, sbol) {

        if(err) {
            callback(err)
        } else {
            callback(null, sbol, sbol.lookupURI(uri))
        }
    });
}

function getComponentMetadata(prefix, uri, callback) {

    var args = [].slice.call(arguments, 0)

    if(args.length < 3) {
        uri = args[0]
        callback = args[1]
        prefix = null
    }

    getMetadata('component', this.backendUrl, this.auth, prefix, uri, callback);

}

function getStackPrefixes(callback) {
    getPrefixes(this.backendUrl, this.auth, callback)
}

function upload(data, callback) {
    doUpload(this.backendUrl, this.auth, data, callback)
}



