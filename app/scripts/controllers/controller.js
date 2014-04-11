/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../views/searchInputView',
    '../views/searchResultView',
    '../views/searchFooterControlsView',
    '../models/searchModel',
    '../models/miniPlayerModel',
    '../collections/songCollection',
    'socketIO',
], function (
    $,
    _,
    Backbone,
    SearchInputView,
    SearchResultView,
    SearchFooterControlsView,
    SearchModel,
    MiniPlayerModel,
    SongCollection,
    socketIO
){
    'use strict';

    var Controller = Backbone.View.extend({
        initialize: function () {
            this.initializeRegions();
            this.initializeModels();
            this.initializeViews();
            this.renderViews();
            this.addViewsToDOM();
            this.initializeSocketIO();
        },

        initializeModels: function() {
            this.searchModel = new SearchModel();
            this.songCollection = new SongCollection();
            this.miniPlayerModel = new MiniPlayerModel();
        },

        initializeRegions: function() {
            this.jMain = $('.main-container');
            this.jSearchInput = this.jMain.find('.search-input');
            this.jSearchResult = this.jMain.find('.search-result');
            this.jSearchFooter = this.jMain.find('.search-footer');
        },

        initializeViews: function() {
            this.searchInputView = new SearchInputView({
                model: this.searchModel
            });

            this.searchResultView = new SearchResultView({
                collection: this.songCollection
            });

            this.searchFooter = new SearchFooterControlsView({
                model: this.searchModel
            });
        },
        
        renderViews: function() {
            this.searchInputView.render();
            this.searchResultView.render();
            this.searchFooter.render();
        },
        
        addViewsToDOM: function() {
            this.jSearchInput.html(this.searchInputView.el);
            this.jSearchResult.html(this.searchResultView.el);
            this.jSearchFooter.html(this.searchFooter.el);
        },

        initializeSocketIO: function() {
            this.socket = socketIO.connect('http://localhost:9003');
        },

        home: function() {
            console.log('go home');
        },

        search: function(page, query) {
            console.log('search ->', 'page:', page, 'query:', query);
            this.searchModel.search(page, query);
        },
    });

    return Controller;
});
