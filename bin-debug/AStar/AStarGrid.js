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
var PracticePro;
(function (PracticePro) {
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid() {
            return _super.call(this) || this;
        }
        Grid.prototype.onload = function () {
            var self = this;
            self._control = self.getControllerAt(0);
            this.addListen();
        };
        Object.defineProperty(Grid.prototype, "row", {
            set: function (row) {
                this._row = row;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "col", {
            set: function (col) {
                this._col = col;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "control", {
            set: function (index) {
                this._control.selectedIndex = index;
            },
            enumerable: true,
            configurable: true
        });
        Grid.prototype.addListen = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touch, this);
        };
        Grid.prototype.removeListen = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touch, this);
        };
        Grid.prototype.touch = function (e) {
            MyEvent.dispach(PracticePro.Data.TOUCH_GRID, { "row": this._row, "col": this._col });
            // console.log("row col", this._row, this._col);
        };
        return Grid;
    }(MyComponent));
    PracticePro.Grid = Grid;
    __reflect(Grid.prototype, "PracticePro.Grid");
})(PracticePro || (PracticePro = {}));
