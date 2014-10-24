/*global define*/

define([
    'underscore',
    'backbone',
    '../communicator/communicator',
    '../libs/ElasticSearcher'
], function (_, Backbone, communicator, ElasticSearcher) {
    'use strict';

    var SearchModel = Backbone.Model.extend({
        url: '',

        initialize: function(options) {
            if(options){
                this.set('page', options.page);
                this.set('size', options.size);
                this.set('sort', options.sort);
            }
            else{
                this.set('page', 1);

                //  TODO: config.js
                this.set('size', 8);
                //  TODO: config.js
                this.set('sort', 'artist:asc,album:asc,filename:asc');
                this.set('totalPages', this.totalPages.bind(this));
            }

            // TODO: elastic search configuration
            // this.elasticSearcher = new ElasticSearcher('http://azk.dev:9200/music_library/song/');
            this.elasticSearcher = new ElasticSearcher('http://azk.dev:9200/music_library_local/songs/');
        },

        defaults: {
        },

        // validate: function(attrs, options) {
        // },

        // parse: function(response, options)  {
        //     return response;
        // },

        navigateToSearch: function() {
            communicator.trigger('router:navigate', this.getSearchUrl());
        },

        getSearchUrl: function() {
            var url = 'search/';
            url += this.get('page');
            url += '/';
            url += this.get('query');
            return url;
        },

        search: function(page, query) {
            this.set('page', page);
            this.set('query', query);

            this.elasticSearcher.searchElasticSearch(this)
                .then(function (data) {
                    //resets Collection
                    communicator.trigger('search:result', data)
                }.bind(this), function(reason) {
                    console.assert(false, reason);
                });
        },

        previousPage: function() {
            var currentPage = this.get('page');
            if(currentPage > 1){
                this.set('page', --currentPage);
            }
        },

        nextPage: function() {
            var total = this.get('total');
            var pageSize = this.get('size');
            var currentPage = this.get('page');

            var totalpages = Math.ceil(total/pageSize);
            if(currentPage < totalpages){
                this.set('page', ++currentPage);
            }
        },

        totalPages: function() {
            var total = this.get('total');
            var pageSize = this.get('size');
            var totalpages = Math.ceil(total/pageSize);

            return totalpages;
        },
    });

    return SearchModel;
});
