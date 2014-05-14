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
            // Getting SID from querystring
            var querystringName = window.location.search.substring(1).split('=')[0];
            var querystringValue = window.location.search.substring(1).split('=')[1];
            if(querystringName === 'sid'){
                this.userModel.set('sid', querystringValue);
            }
            console.log('this.userModel.sid:', this.userModel.get('sid'));

            var clientID = {
                appName: '2-musicSearcher',
                sid: this.userModel.get('sid')
            };

            //TODO: this must be dynamic
            this.socket = socketIO.connect('http://192.168.15.103:9003');

            // first connection -> send SID to server
            // server -> client
            this.socket.on('connect', function (){
                // client -> server
                this.socket.emit('client:connection', clientID);
            }.bind(this));

            this.socket.on('server:userName', function (userName){
                $('#socketInfo').html('connected as ' + userName);
            }.bind(this));


            //////////////////////////
            // communicator -> server
            //////////////////////////
            communicator.on('socket:message', function(options) {
                // client -> server
                this.socket.emit(options.name, {
                    clientID: clientID,
                    data: options.data
                });
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
