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
var SwitchColorGrid = (function (_super) {
    __extends(SwitchColorGrid, _super);
    function SwitchColorGrid() {
        return _super.call(this) || this;
    }
    SwitchColorGrid.prototype.onload = function () {
        this._isKey = false;
    };
    Object.defineProperty(SwitchColorGrid.prototype, "isKey", {
        set: function (val) {
            this._isKey = val;
        },
        enumerable: true,
        configurable: true
    });
    SwitchColorGrid.prototype.addListen = function () {
        if (this._isKey) {
            this.touchable = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next, this);
        }
    };
    SwitchColorGrid.prototype.next = function (evt) {
        MyEvent.dispach(Data.NEXT_ROUND);
    };
    SwitchColorGrid.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.next, this);
    };
    return SwitchColorGrid;
}(MyComponent));
__reflect(SwitchColorGrid.prototype, "SwitchColorGrid");
//# sourceMappingURL=Grid.js.map