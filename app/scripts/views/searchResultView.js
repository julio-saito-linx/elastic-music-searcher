/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SearchResultView = Backbone.View.extend({
        template: JST['app/scripts/templates/searchResultView.ejs'],

        tagName: 'div',
        
        className: 'row',

        id: '',

        events: {},

        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function () {
            //this.collection.toJSON()
            this.$el.html(this.template());
        }
    });

    return SearchResultView;
});
