/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SearchInputView = Backbone.View.extend({
        template: JST['app/scripts/templates/searchInputView.hbs'],

        tagName: 'div',
        
        className: 'row',

        id: '',

        events: {
            'keydown #txtSearch': 'processKeydown',
            'click #btnSearch': 'search',
            'click #btnPrevious': 'previousPage',
            'click #btnNext': 'nextPage',
            'click #dropDownPlayers>li': 'playerChanged'
        },

        initialize: function () {
            this.listenTo(this.model, 'change:query', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.initializeJqueryElements();
        },

        initializeJqueryElements: function() {
            this.jTxtSearch = this.$el.find('#txtSearch');
            // this.jBtnSearch = this.$el.find('#btnSearch');
            // this.jBtnNext = this.$el.find('#btnNext');

            this.jTxtSearch.val(this.model.get('query'));
            this.jTxtSearch.focus();
        },

        processKeydown: function(e) {
            if(e.which === 13){
                this.search();
            }
        },

        search: function() {
            var searchText = this.jTxtSearch.val();
            this.model.set('query', searchText);
            this.model.set('page', 1);
            this.model.navigateToSearch();
        },

        previousPage: function() {
            this.model.previousPage();
            this.model.navigateToSearch();
        },

        nextPage: function() {
            this.model.nextPage();
            this.model.navigateToSearch();
        },

        playerChanged: function(e) {
            var selectedPlayer = $(e.target);
            var jASelected = this.$el.find('#dropDownPlayerSelected');
            jASelected.text(selectedPlayer.text());

            this.model.set('selectedPlayer', selectedPlayer);
            console.log('this.model.get', this.model.get('selectedPlayer'));
        }

    });

    return SearchInputView;
});
