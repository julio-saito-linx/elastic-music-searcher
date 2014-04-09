/*global define*/

define([
    'underscore',
    'backbone',
    '../communicator/communicator'
], function (_, Backbone, communicator) {
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
        },

        defaults: {
        },

        // validate: function(attrs, options) {
        // },

        // parse: function(response, options)  {
        //     return response;
        // },

        search: function(searchText) {
            this.set('query', searchText);
            this.set('page', 1);

            this.query = searchText;

            communicator.trigger('router:navigate', this.getSearchUrl());
        },

        getSearchUrl: function() {
            var url = 'search/';
            url += this.get('page');
            url += '/';
            url += this.get('query');
            return url;
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
