/*global define*/

define([
    'underscore',
    'backbone',
    '../libs/prettySize',
    '../libs/prettyMinutes'
], function (_, Backbone, prettySize, prettyMinutes) {
    'use strict';

    var SongModel = Backbone.Model.extend({
        url: '',

        initialize: function() {
            //////
            /// sizeFormated
            //////
            this.set('sizeFormated', function() {
                var size = this.get('size');
                return prettySize(size);
            }.bind(this));

            //////
            /// durationFormated
            //////
            this.set('durationFormated', function() {
                var seconds = this.get('duration');
                return prettyMinutes(seconds);
            }.bind(this));

            //////
            /// bitRateFormated
            //////
            this.set('bitRateFormated', function() {
                var bitRate = this.get('bit_rate');
                bitRate = Math.round(bitRate / 1000);
                return bitRate;
            }.bind(this));

            //////
            /// downloadLink
            //////
            this.set('downloadLink', function() {
                // TODO: 192.168... must be dynamic
                var filename = 'http://mp3server.azk.dev' + this.get('filename');
                filename = encodeURI(filename);
                //return url_converter( filename );
                return  filename;
            }.bind(this));

            var fileName = this.get('filename');
            var fileNameParts = fileName.split('/');
            var name = fileNameParts[fileNameParts.length-1];
            var lastDir = fileNameParts[fileNameParts.length-2];

            var artist = this.get('artist');
            var album = this.get('album');
            var title = this.get('title');

            if(!artist || artist.length === 0){
                this.set('artist', '# '+ lastDir);
            }
            if(!album || album.length === 0){
                this.set('album', '# '+ lastDir);
            }
            if(!title || title.length === 0){
                this.set('title', '# '+ name);
            }
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return SongModel;
});
