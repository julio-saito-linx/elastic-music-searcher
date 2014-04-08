/*global define*/

define([
    'underscore',
    'backbone',
    'models/songModel'
], function (_, Backbone, SongModel) {
    'use strict';

    var SongCollection = Backbone.Collection.extend({
        model: SongModel
    });

    return SongCollection;
});
