/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        rsvp: '../bower_components/rsvp/rsvp.amd',
        handlebars: '../bower_components/handlebars/handlebars',
        socketIO: 'http://localhost:9003/socket.io/socket.io'
    }
});

require([
    'backbone',
    './controllers/controller',
    './routes/mainRouter',
    'rsvp'
], function (Backbone, Controller, MainRouter, RSVP) {

    // ensures that no errors will be omitted
    RSVP.on('error', function(reason) {
      console.error(reason.stack);
    });

    var controller = new Controller();
    var router = new MainRouter({
        controller: controller
    });

    window.__app = {};
    window.__app.controller = controller;

    Backbone.history.start();
});
