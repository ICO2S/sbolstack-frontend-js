
var StackFrontend = require('./lib/stack-frontend');

var stack = new StackFrontend('http://biocad.ncl.ac.uk/igem')

stack.countComponents(function(err, numComponents) {
    console.log(numComponents + ' components');
});

stack.countSequences(function(err, numSequences) {
    console.log(numSequences + ' sequences');
});

stack.countModules(function(err, numModules) {
    console.log(numModules + ' modules');
});

stack.countModules(function(err, numCollections) {
    console.log(numCollections + ' collections');
});

stack.searchComponentMetadata([
    {
        key: 'name',
        value: '*R00*',
        exactMatch: false
    }
], function(err, results) {

    console.log('Search component metadata returned ' + results.length + ' results');
});

stack.searchComponentSBOL([
    {
        key: 'name',
        value: '*R00*',
        exactMatch: false
    }
], function(err, sbol) {

    console.log('Search component SBOL returned a valid SBOL document with ' + sbol.componentDefinitions.length + ' component definitions');
});

