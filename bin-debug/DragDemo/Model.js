var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DragPro;
(function (DragPro) {
    var Model = (function () {
        function Model() {
        }
        Object.defineProperty(Model, "instance", {
            get: function () {
                return this._inst || (this._inst = new Model());
            },
            enumerable: true,
            configurable: true
        });
        Model.prototype.init = function () {
        };
        Model.prototype.initDrag = function (initpoint) {
            this._radian = 0;
            this._initPoint = initpoint;
        };
        return Model;
    }());
    DragPro.Model = Model;
    __reflect(Model.prototype, "DragPro.Model");
})(DragPro || (DragPro = {}));
//# sourceMappingURL=Model.js.map