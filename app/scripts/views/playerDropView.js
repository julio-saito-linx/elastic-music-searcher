/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    './playerDropItemView'
], function ($, _, Backbone, JST, PlayerDropItemView) {
    'use strict';

    var PlayerDropView = Backbone.View.extend({
        template: JST['app/scripts/templates/playerDropView.hbs'],

        tagName: 'li',

        id: '',

        className: 'dropdown',

        events: {},

        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
        },


        render: function () {
            this.$el.html(this.template());

            this.initializeJqueryElements();

            this.renderItens();
        },

        initializeJqueryElements: function() {
            this.jDropPlayers = this.$el.find('#dropDownPlayers');
        },

        renderItens: function() {
            for (var i = 0; i < this.collection.models.length; i++) {
                var playerModel = this.collection.models[i];

                var playerDropItemView = new PlayerDropItemView({
                    model: playerModel
                });
                playerDropItemView.render();

                this.jDropPlayers.prepend(playerDropItemView.el);
            }
        }
    });

    return PlayerDropView;
});
