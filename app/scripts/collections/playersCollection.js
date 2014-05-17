/*global define*/

define([
    'underscore',
    'backbone',
    'models/playerModel'
], function (_, Backbone, PlayerModel) {
    'use strict';

    var PlayersCollection = Backbone.Collection.extend({
        model: PlayerModel,

        selectPlayer: function(playerSelected) {
            for (var i = 0; i < this.models.length; i++) {
                var player = this.models[i];
                player.set('selected', false);
                console.log('unselected:', player.get('playerName'));
            };

            playerSelected.set('selected', true);
            console.log('selected:', playerSelected.get('playerName'));
        }

    });

    return PlayersCollection;
});
