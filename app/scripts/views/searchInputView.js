/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SearchInputView = Backbone.View.extend({
        template: JST['app/scripts/templates/searchInputView.ejs'],

        tagName: 'div',
        
        className: 'row',

        id: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    return SearchInputView;
});
