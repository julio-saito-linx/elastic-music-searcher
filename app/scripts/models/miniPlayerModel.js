/*global define*/

define([
    'underscore',
    'backbone',
    '../communicator/communicator'
], function (_, Backbone, communicator) {
    'use strict';

    var MiniPlayerModel = Backbone.Model.extend({
        initialize: function() {
            this.audio = new Audio();
            communicator.on('play:preview', this.play, this);
            communicator.on('stop:preview', this.pause, this);
        },

        play: function(src) {
            this.audio.src = src;
            this.audio.play();
        },

        pause: function() {
            this.audio.pause();
        }
    });

    return MiniPlayerModel;
});
