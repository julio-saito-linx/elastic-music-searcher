/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../views/searchInputView',
    '../views/searchResultView',
    '../models/searchModel',
    '../collections/songCollection'
], function (
    $,
    _,
    Backbone,
    SearchInputView,
    SearchResultView,
    SearchModel,
    SongCollection
){
    'use strict';

    var Controller = Backbone.View.extend({
        initialize: function () {
            this.initializeRegions();
            this.initializeModels();
            this.initializeViews();
            this.renderViews();
            this.addViewsToDOM();
        },

        initializeModels: function() {
            this.searchModel = new SearchModel();
            this.songCollection = new SongCollection();
        },

        initializeRegions: function() {
            this.jMain = $('.main-container');
            this.jSearchInput = this.jMain.find('.search-input');
            this.jSearchResult = this.jMain.find('.search-result');
        },

        initializeViews: function() {
            this.searchInputView = new SearchInputView({
                model: this.searchModel
            });

            this.searchResultView = new SearchResultView({
                collection: this.songCollection
            });
        },
        
        renderViews: function() {
            this.searchInputView.render();
            this.searchResultView.render();
        },
        
        addViewsToDOM: function() {
            this.jSearchInput.html(this.searchInputView.el);
            this.jSearchResult.html(this.searchResultView.el);
        },

        home: function() {
            console.log('go home');
        },

        search: function(page, query) {
            console.log('search ->', 'page:', page, 'query:', query);
        },
    });

    return Controller;
});
