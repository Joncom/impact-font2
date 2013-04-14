ig.module('plugins.joncom.border-font')
.requires('impact.font')
.defines(function() {

    "use strict";

    ig.BorderFont = ig.Font.extend({

        borderSize: 1,

        onLoad: function(event) {
            // Create new offscreen canvas where we will build out new font.
            var canvas = ig.$new('canvas');
            canvas.width = this._getNewFontWidth();
            canvas.height = image.height;
            // Draw image to canvas.
            var ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            // Determine which pixels are non-alpha.
            var data = ctx.getImageData(0, 0, image.width, image.height);
            var pixels = _getNonAlphaPixels(data);





            this.parent(event);
        },

        _createBorderData: function(image) {
            // Create an offscreen canvas.
            var canvas = ig.$new('canvas');
            canvas.width = image.width + (2 * this.borderSize);
            canvas.height = image.height + (2 * this.borderSize);
            // Draw image to canvas.
            var ctx = canvas.getContext('2d');
            ctx.drawImage(image, this.borderSize, 0);
            // Will use these pixels as starting points.
            var pixels = _getNonAlphaPixels(image);
            // Loop through pixels.
            for (var x in pixels) {
                for(var y in pixels[x]) {
                    // draw to canvas here.
                }

            }
        },

        // Returns the new width after accounting for borders.
        _getNewFontWidth: function() {
            var widthFromBorders = this.widthMap.length * (this.borderSize * 2);
            var widthFromFont = 0;
            for(var i=0; i<this.widthMap.length) {
                widthFromFont += this.widthMap[i];
            }
            return widthFromBorders + widthFromFont;
        },

        _getNewFontHeight: function() {
            return this.height + this.borderSize * 2;
        },

        _getNonAlphaPixels: function(data) {
            var nonAlphaPixels = {};
            for(var x = 0; x < data.width; x++) {
                for(var y = 0; y < data.height; y++) {
                    var alpha = data[((data.width * y) + x) * 4 + 3]; // alpha data for pixel
                    // Is the pixel non-alpha?
                    if(alpha !== 0) {
                        // Remember that this x and y is non alpha!
                        if(typeof nonAlphaPixels[x] === 'undefined') nonAlphaPixels[x] = { y: true };
                        else nonAlphaPixels[x][y] = true;
                    }
                }
            }
            return nonAlphaPixels;
        }

    });

});