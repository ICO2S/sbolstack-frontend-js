
var count = require('./count')
var getSBOL = require('./getSBOL')
var searchMetadata = require('./searchMetadata')
var getMetadata = require('./getMetadata')
var searchSBOL = require('./searchSBOL')
var doSparql = require('./sparql')
var doUpload = require('./upload')

function Store(storeUrl, auth) {

    this.storeUrl = storeUrl
    this.auth = auth

}

module.exports = Store

Store.prototype = {

    sparql: sparql,

    upload: upload,

    countComponents: countComponents,
    countSequences: countSequences,
    countModules: countModules,
    countCollections: countCollections,

    searchComponentSBOL: searchComponentSBOL,
    searchComponentMetadata: searchComponentMetadata,

    getComponentSBOL: getComponentSBOL,
    getModuleSBOL: getModuleSBOL,
    getCollectionSBOL: getCollectionSBOL,

    getComponentMetadata: getComponentMetadata,
    getModuleMetadata: getModuleMetadata
}

function sparql(query, accept, callback) {

    var args = [].slice.call(arguments, 0)

    if(args.length < 3) {
        query = args[0]
        callback = args[1]
        accept = null
    }

    doSparql(this.storeUrl, this.auth, query, accept, callback)
}

function countComponents(callback) {
    count('component', this.storeUrl, this.auth, callback);
}

function countSequences(callback) {
    count('sequence', this.storeUrl, this.auth, callback);
}

function countModules(callback) {
    count('module', this.storeUrl, this.auth, callback);
}

function countCollections(callback) {
    count('collection', this.storeUrl, this.auth, callback);
}

function searchComponentSBOL(criteria, callback) {
    searchSBOL('component', this.storeUrl, this.auth, criteria, callback);
}

function searchComponentMetadata(criteria, callback) {
    searchMetadata('component', this.storeUrl, this.auth, criteria, callback);
}

function getComponentSBOL(prefix, uri, callback) {

    var args = [].slice.call(arguments, 0)

    if(args.length < 3) {
        uri = args[0]
        callback = args[1]
        prefix = null
    }

    getSBOL('component', this.storeUrl, this.auth, prefix, uri, function(err, sbol) {

        if(err) {
            callback(err)
        } else {
            callback(null, sbol, sbol.lookupURI(uri))
        }
    });
}

function getModuleSBOL(prefix, uri, callback) {

    var args = [].slice.call(arguments, 0)

    if(args.length < 3) {
        uri = args[0]
        callback = args[1]
        prefix = null
    }

    getSBOL('module', this.storeUrl, this.auth, prefix, uri, function(err, sbol) {

        if(err) {
            callback(err)
        } else {
            callback(null, sbol, sbol.lookupURI(uri))
        }
    });
}

function getCollectionSBOL(prefix, uri, callback) {

    var args = [].slice.call(arguments, 0)

    if(args.length < 3) {
        uri = args[0]
        callback = args[1]
        prefix = null
    }

    getSBOL('collection', this.storeUrl, this.auth, prefix, uri, function(err, sbol) {

        if(err) {
            callback(err)
        } else {
            callback(null, sbol, sbol.lookupURI(uri))
        }
    });
}

function upload(data, callback) {

    doUpload(this.storeUrl, this.auth, data, callback)

}

function getComponentMetadata(prefix, uri, callback) {

    var args = [].slice.call(arguments, 0)

    if(args.length < 3) {
        uri = args[0]
        callback = args[1]
        prefix = null
    }

    getMetadata('component', this.storeUrl, this.auth, prefix, uri, callback);

}

function getModuleMetadata(prefix, uri, callback) {

    var args = [].slice.call(arguments, 0)

    if(args.length < 3) {
        uri = args[0]
        callback = args[1]
        prefix = null
    }

    getMetadata('module', this.storeUrl, this.auth, prefix, uri, callback);

}







