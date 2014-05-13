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
    '../models/userModel',
    '../collections/songCollection',
    '../communicator/communicator',
    'socketIO'
], function (
    $,
    _,
    Backbone,
    SearchInputView,
    SearchResultView,
    SearchFooterControlsView,
    SearchModel,
    MiniPlayerModel,
    UserModel,
    SongCollection,
    communicator,
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
            this.userModel = new UserModel();
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
            //TODO: this must be dynamic
            this.socket = socketIO.connect('http://192.168.15.103:9003');

            // first connection
            // server -> client
            this.socket.on('connect', function (){
                console.info('connected to socket.io');
                // client -> server
                this.socket.emit('client:connection', {
                    appName: '2-musicSearcher'
                });
            }.bind(this));

            // server -> client
            this.socket.on('server:status', function (data){
                console.info('server:status', data);
                this.userModel.set('serverData', data.serverData);
            }.bind(this));

            // communicator -> server
            communicator.on('socket:message', function(options) {
                // client -> server
                this.socket.emit(options.name, options.data);
            }.bind(this));

        },

        home: function() {},

        search: function(page, query) {
            console.log('search ->', 'page:', page, 'query:', query);
            this.searchModel.search(page, query);
        },
    });

    return Controller;
});
