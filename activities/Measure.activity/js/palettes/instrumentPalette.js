define(["sugar-web/graphics/palette", "text!activity/palettes/loggingPalette.html"], function (palette, template) {

    var pawnpalette = {};

    pawnpalette.PawnPalette = function (invoker, primaryText) {
        palette.Palette.call(this, invoker, primaryText);

        var template = `
            <div id="item-one" class="palette-item">
                None
            </div>
            <div id="item-two" class="palette-item">
                Guitar
            </div>
            <div id="item-three" class="palette-item">
                Violin
            </div>
            <div id="item-four" class="palette-item">
                Viola
            </div>
            <div  class="palette-item">
                Cello
            </div>
            <div class="palette-item">
                Bass
            </div>
            <div i class="palette-item">
                Cavaquinho
            </div>
            <div  class="palette-item">
                Ukulele
            </div>
        `
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