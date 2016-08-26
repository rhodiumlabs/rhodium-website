require('babel-core/register');
console.log(process.env.NODE_ENV);

var jsdom = require('jsdom');
 
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.navigator = {userAgent: 'backend'};
global.window = {SVGElement:null};

require('./server');

