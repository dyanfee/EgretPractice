var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var DragPro;
(function (DragPro) {
    var Trapezoid = (function (_super) {
        __extends(Trapezoid, _super);
        function Trapezoid() {
            return _super.call(this) || this;
        }
        Trapezoid.prototype.myload = function () {
        };
        return Trapezoid;
    }(MyComponent));
    DragPro.Trapezoid = Trapezoid;
    __reflect(Trapezoid.prototype, "DragPro.Trapezoid");
})(DragPro || (DragPro = {}));
//# sourceMappingURL=Trapezoid.js.map