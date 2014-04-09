/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SearchResultItemView = Backbone.View.extend({
        template: JST['app/scripts/templates/searchResultItemView.hbs'],

        tagName: 'tr',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            var html = this.template(this.model.toJSON());
            this.$el.html(html);
        }
    });

    return SearchResultItemView;
});
