/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    './playerDropItemView',
    '../communicator/communicator'
], function ($, _, Backbone, JST, PlayerDropItemView, communicator) {
    'use strict';

    var PlayerDropView = Backbone.View.extend({
        template: JST['app/scripts/templates/playerDropView.hbs'],

        tagName: 'div',

        id: '',

        className: 'btn-group',

        events: {},

        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
            communicator.on('player:selected', this.playerSelected, this);
        },

        // clearPlayerDropDown: function() {
        //     this.searchModel.set('players', []);
        // },

        // addPlayerDropDown: function(newPlayer) {
        //     var playerList = this.searchModel.get('players');
        //     playerList.push(newPlayer);
        // },

        // playerChanged: function(e) {
        //     var selectedPlayer = $(e.target);
        //     this.jASelected.text(selectedPlayer.text());

        //     this.model.set('selectedPlayer', selectedPlayer);
        //     console.log('this.model.get', this.model.get('selectedPlayer'));
        // },

        // renderPlayers: function(playerCollection) {
        //     // clean UL
        //     //this.jUlDropDownHome.html('');

        //     var playerDropView = new PlayerDropView({
        //         collection: playerCollection
        //     });

        //     playerDropView.render();

        //     this.jUlDropDownHome.append(playerDropView.el);
        // }

        render: function () {
            this.$el.html(this.template());

            this.initializeJqueryElements();

            this.renderItens();
        },

        initializeJqueryElements: function() {
            this.jDropPlayers = this.$el.find('#dropDownPlayers');
            this.jDropPlayerSelected = this.$el.find('#dropDownPlayerSelected');
        },

        renderItens: function() {
            for (var i = 0; i < this.collection.models.length; i++) {
                var playerModel = this.collection.models[i];

                var playerDropItemView = new PlayerDropItemView({
                    model: playerModel
                });
                playerDropItemView.render();

                this.jDropPlayers.prepend(playerDropItemView.el);
            }
        },

        playerSelected: function(player) {
            this.jDropPlayerSelected.text(player.get('playerName'));
        }
    });

    return PlayerDropView;
});
