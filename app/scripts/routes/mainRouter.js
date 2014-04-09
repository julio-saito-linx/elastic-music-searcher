/*global define*/

define([
    'jquery',
    'backbone',
    '../communicator/communicator'
], function ($, Backbone, communicator) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
        initialize: function(options) {
            this.controller = options.controller;
            communicator.on('router:navigate', this.navigateTo, this);
        },

        routes: {
            '': 'home',
            'search/:page/:query' : 'search'
        },

        navigateTo: function(url, trigger) {
            this.navigate(url, { trigger: trigger || true });
        },

        home: function() {
            this.controller.home();
        },

        search: function(page, query) {
            this.controller.search(page, query);
        }


    });

    return MainRouter;
});
