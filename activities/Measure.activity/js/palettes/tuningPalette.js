define(["sugar-web/graphics/palette", "text!activity/palettes/tuningPalette.html"], function (palette, template) {

    var pawnpalette = {};

    pawnpalette.PawnPalette = function (invoker, primaryText) {
        palette.Palette.call(this, invoker, primaryText);

        // var template = '';
        var containerElem = document.createElement('div');
        containerElem.innerHTML = template;
        this.setContent([containerElem]);
    };

    var addEventListener = function (type, listener, useCapture) {
        return this.getPalette().addEventListener(type, listener, useCapture);
    };

    pawnpalette.PawnPalette.prototype = Object.create(palette.Palette.prototype, {
        addEventListener: {
            value: addEventListener,
            enumerable: true,
            configurable: true,
            writable: true
        }
    });

    return pawnpalette;
});