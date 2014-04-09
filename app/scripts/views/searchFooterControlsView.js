/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SearchInputView = Backbone.View.extend({
        template: JST['app/scripts/templates/searchFooterControlsView.hbs'],

        tagName: 'div',
        
        className: 'row',

        id: '',

        events: {
            'click #btnPrevious': 'previousPage',
            'click #btnNext': 'nextPage'
        },

        initialize: function () {
            //this.listenTo(this.model, 'change:query', this.render);
        },

        render: function () {
            var data = this.model.toJSON();
            this.$el.html(this.template());

            // this.initializeJqueryElements();
        },

        // initializeJqueryElements: function() {
        //     this.jTxtSearch = this.$el.find('#txtSearch');
        //     // this.jBtnSearch = this.$el.find('#btnSearch');
        //     // this.jBtnNext = this.$el.find('#btnNext');

        //     this.jTxtSearch.val(this.model.get('query'));
        //     this.jTxtSearch.focus();
        // },

        // processKeydown: function(e) {
        //     if(e.which === 13){
        //         this.search();
        //     }
        // },

        previousPage: function() {
            this.model.previousPage();
            this.model.navigateToSearch();
        },

        nextPage: function() {
            this.model.nextPage();
            this.model.navigateToSearch();
        }

    });

    return SearchInputView;
});
