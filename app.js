/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Utilities
/* Thanks, coffee-script! */
__extends = function(child, parent) {

    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;

    return child;
};

util = require('util');

// NextJs classes
ComponentRegistry = require('./lib/component_registry');
ClassRegistry = require('./lib/class_registry');
Component = require('./lib/component');

// Test component
Counter = require('./app/components/counter');
SubCounter = require('./app/components/sub_counter');
var counter = new Counter('some counter');
var subCounter = new SubCounter('anotherCounter');

// Controllers
var componentsController = require('./app/controllers/components');

// Configuration
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyDecoder());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.staticProvider(__dirname + '/public'));

});

app.configure('development',
function() {
    app.use(express.errorHandler(
        {
        dumpExceptions: true,
        showStack: true
    }
    ));
});

app.configure('production',
function() {
    app.use(express.errorHandler());
});

// Routes
app.get('/',
function(req, res) {
    res.render('index', {
        locals: {
            title: 'NextJs'
        }
    });
});

app.get('/components/:componentId', componentsController.index);
app.post('/components', componentsController.indexPost);

// Only listen on $ node app.js
if (!module.parent) {
    app.listen(80);
    console.log('Express server listening on port %d', app.address().port);
}
