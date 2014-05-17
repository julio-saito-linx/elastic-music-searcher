/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var PlayerDropItemView = Backbone.View.extend({
        template: JST['app/scripts/templates/playerDropItemView.hbs'],

        tagName: 'li',

        id: '',

        className: '',

        events: {
            'click a': 'playerSelected'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },

        playerSelected: function(e) {
            this.model.collection.selectPlayer(this.model);
        }
    });

    return PlayerDropItemView;
});
