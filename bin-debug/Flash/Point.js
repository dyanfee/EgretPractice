var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Flash;
(function (Flash) {
    var Point = (function () {
        function Point(x, y) {
            this._x = x;
            this._y = y;
        }
        Object.defineProperty(Point, "Point", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (v) {
                this._x = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (v) {
                this._y = v;
            },
            enumerable: true,
            configurable: true
        });
        return Point;
    }());
    Flash.Point = Point;
    __reflect(Point.prototype, "Flash.Point");
})(Flash || (Flash = {}));
//# sourceMappingURL=Point.js.map