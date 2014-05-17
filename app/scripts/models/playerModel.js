/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var PlayerModel = Backbone.Model.extend({
        url: '',

        initialize: function() {
            this.set('playerName', (function() {
                return this.get('userName') + '-['+ this.get('sid') +']';
            }.bind(this))());
        },

        defaults: {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return PlayerModel;
});
