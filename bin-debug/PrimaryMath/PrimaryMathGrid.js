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
var PrimaryMathGrid = (function (_super) {
    __extends(PrimaryMathGrid, _super);
    function PrimaryMathGrid() {
        return _super.call(this) || this;
    }
    PrimaryMathGrid.prototype.onload = function () {
        this._control = this.getController("c1");
    };
    PrimaryMathGrid.prototype.initGrid = function (num) {
        this._control.selectedIndex = num;
        this._correctKey = false;
        this.addListen();
    };
    PrimaryMathGrid.prototype.setKey = function (val) {
        this._correctKey = val;
    };
    PrimaryMathGrid.prototype.isCorrect = function () {
        console.log("---------", this._correctKey);
        if (this._correctKey)
            MyEvent.dispach(Data.NEXT_ROUND);
        else
            MyEvent.dispach(Data.ERROR_ANSWER);
    };
    PrimaryMathGrid.prototype.addListen = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.isCorrect, this);
    };
    PrimaryMathGrid.prototype.removeListen = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.isCorrect, this);
    };
    PrimaryMathGrid.prototype.release = function () {
        this.removeListen();
    };
    PrimaryMathGrid.prototype.dispose = function () {
        this.removeListen();
        _super.prototype.dispose.call(this);
    };
    return PrimaryMathGrid;
}(MyComponent));
__reflect(PrimaryMathGrid.prototype, "PrimaryMathGrid");
//# sourceMappingURL=PrimaryMathGrid.js.map