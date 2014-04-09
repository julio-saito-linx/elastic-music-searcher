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

        events: {
            'click #btnSearch': 'search'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            this.jBtnSearch = this.$el.find('#btnSearch');
            this.jTxtSearch = this.$el.find('#txtSearch');
        },

        search: function() {
            var searchText = this.jTxtSearch.val();
            this.model.search(searchText);
        }

    });

    return SearchInputView;
});
