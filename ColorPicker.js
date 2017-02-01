define([
    'dojo/_base/declare',
    'dojo/topic',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./ColorPicker.html',
    'dojo/domReady!'
], function (
    declare,
    topic,
    _WidgetBase,
    _TemplatedMixin,
    template
    ) {
    'use strict';
    return declare([_WidgetBase, _TemplatedMixin], {
        baseClass: 'colorPicker',
        templateString: template,
        _colorPickerId: null,
        _colorPicker: null,
        _colorPickerInit: function () {
            this._colorPicker = window.UIColorPicker.init(this.id);
        },
        getRgbaObject: function (str) {
            var match = str.match(/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/);
            return match ? {
                r: Number(match[1]),
                g: Number(match[2]),
                b: Number(match[3]),
                a: Number(match[4])
            } : {};
        },
        _logicInitColorPicker: function () {
            this._colorPickerInit();
            this._setColorAtInit();
            this._subscribeToPicker();
        },
        _subscribeToPicker: function () {
            window.UIColorPicker.subscribe('picker', function (data) {
                var cssColor = 'rgba(' + data.r + ', ' + data.g + ', ' + data.b + ', ' + data.a + ')';
                topic.publish('ColorPicker/event/colorChange', cssColor);
            });
        },
        _setColorAtInit: function () {
            var color = this.getRgbaObject(this._colorAtInit);
            this._colorPicker.setColor(new window.UIColorPicker.RGBAColor(
                    color.r,
                    color.g,
                    color.b,
                    color.a
                ));
        },
        postCreate: function () {
            this._logicInitColorPicker();
        },
        constructor: function (optionsArg) {
            this._colorAtInit = optionsArg.colorAtInit;
        }
    });
});
