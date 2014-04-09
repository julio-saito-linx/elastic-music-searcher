/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    '../communicator/communicator',
    '../models/songModel',
    './searchResultItemView'
], function ($, _, Backbone, JST, communicator, SongModel, SearchResultItemView) {
    'use strict';

    var SearchResultView = Backbone.View.extend({
        template: JST['app/scripts/templates/searchResultView.hbs'],

        tagName: 'div',
        
        className: 'row',

        id: '',

        events: {},

        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
            communicator.on('search:result', this.renderResult, this);
        },

        render: function () {
            //this.collection.toJSON()
            this.$el.html(this.template());

            this.jTbody = this.$el.find('tbody');
        },

        renderResult: function(data) {
            // clean table
            this.jTbody.html('');

            for (var i = 0; i < data.length; i++) {
                //model
                var song = new SongModel(data[i]);

                //item view
                var itemView = new SearchResultItemView({
                    model: song
                });

                itemView.render();
                this.addItemView(itemView.el);
            };
        },

        addItemView: function(itemElement) {
            this.jTbody.append(itemElement);
        }
    });

    return SearchResultView;
});
