define(["sugar-web/graphics/palette", "text!activity/palettes/loggingPalette.html"], function (palette, template) {

    var pawnpalette = {};

    pawnpalette.PawnPalette = function (invoker, primaryText) {
        palette.Palette.call(this, invoker, primaryText);

        var template = `
            <div>
                <img id="freq-low-button" style="height: 55px;width: 55px;background-repeat: no-repeat"></button>
                <input type="range" min="1" max="100" value="50" class="slider" style="width: 143px;">
                <img id="freq-high-button" style="height: 55px;width: 55px;background-repeat: no-repeat"></button>
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