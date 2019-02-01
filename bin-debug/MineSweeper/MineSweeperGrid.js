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
var MineSweeperGrid = (function (_super) {
    __extends(MineSweeperGrid, _super);
    function MineSweeperGrid() {
        var _this = _super.call(this) || this;
        _this._touch = true;
        return _this;
    }
    MineSweeperGrid.prototype.onload = function () {
        this.touchable = false;
    };
    MineSweeperGrid.prototype.setPosition = function (row, col) {
        this._row = row;
        this._col = col;
    };
    MineSweeperGrid.prototype.disappear = function () {
        var _this = this;
        this.getTransition("disappear").play(function () {
            _this.removeFromParent();
        });
    };
    Object.defineProperty(MineSweeperGrid.prototype, "row", {
        get: function () {
            return this._row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MineSweeperGrid.prototype, "col", {
        get: function () {
            return this._col;
        },
        enumerable: true,
        configurable: true
    });
    return MineSweeperGrid;
}(MyComponent));
__reflect(MineSweeperGrid.prototype, "MineSweeperGrid");
