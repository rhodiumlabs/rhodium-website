require('babel-core/register');
var jsdom = require('jsdom');
 
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.navigator = {userAgent: 'backend'};
global.window = {SVGElement:null};


require('./server');

