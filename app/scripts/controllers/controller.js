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
    '../collections/playersCollection',
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
    PlayersCollection,
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

        initializeRegions: function() {
            this.jMain = $('.main-container');
            this.jSearchInput = this.jMain.find('.search-input');
            this.jSearchResult = this.jMain.find('.search-result');
            this.jSearchFooter = this.jMain.find('.search-footer');
        },

        initializeModels: function() {
            this.searchModel = new SearchModel();
            this.songCollection = new SongCollection();
            this.miniPlayerModel = new MiniPlayerModel();
            this.userModel = new UserModel();
            this.playersCollection = new PlayersCollection();
        },

        initializeViews: function() {
            this.searchInputView = new SearchInputView({
                model: this.searchModel,
                playersCollection: this.playersCollection
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

            var clientInfo = {
                appName: '2-musicSearcher',
                sid: this.userModel.get('sid')
            };
            console.info('me:', clientInfo);

            //TODO: this must be dynamic
            this.socket = socketIO.connect('http://192.168.15.103:9003');

            // first connection -> send SID to server
            // server -> client
            this.socket.on('connect', function (){
                // client -> server
                this.socket.emit('client:connection', clientInfo);

                // request list of players
                this.socket.emit('client:request:players:connected', clientInfo);
            }.bind(this));

            this.socket.on('server:userName', function (userName){
                
                clientInfo.userName = userName;
                
                // userName received
                $('#socketInfo').html('connected as ' + clientInfo.userName);


            }.bind(this));


            this.socket.on('server:response:players:connected', function (playersList){
                console.log('playersList:', playersList);

                this.playersCollection.reset(playersList);
                // this.clearPlayerDropDown();
                // for (var i = 0; i < playersList.length; i++) {
                //     var player = playersList[i];
                //     this.addPlayerDropDown(player);      
                // };
            }.bind(this));



            //////////////////////////
            // communicator -> server
            //////////////////////////
            communicator.on('socket:message', function(options) {
                // client -> server
                this.socket.emit(options.name, {
                    clientInfo: clientInfo,
                    data: options.data
                });
            }.bind(this));

        },

        clearPlayerDropDown: function() {
            this.searchModel.set('players', []);
        },

        addPlayerDropDown: function(newPlayer) {
            var playerList = this.searchModel.get('players');
            playerList.push(newPlayer);
        },

        home: function() {},

        search: function(page, query) {
            console.log('search ->', 'page:', page, 'query:', query);
            this.searchModel.search(page, query);
        },
    });

    return Controller;
});
