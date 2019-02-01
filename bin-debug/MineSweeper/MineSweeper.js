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
var MineSweeper = (function (_super) {
    __extends(MineSweeper, _super);
    function MineSweeper() {
        var _this = _super.call(this) || this;
        _this._maxRow = 20;
        _this._maxCol = 20;
        _this._mineNum = 10;
        _this._gridSize = 35;
        return _this;
    }
    MineSweeper.prototype.init = function () {
        MineSweeperModel.instance.init(this._maxRow, this._maxCol, this._mineNum);
        this._board = this.getChild("board").asCom;
        this._mineNumText = this.getChild("mine").asTextField;
        this._mineNumText.text = this._mineNum + "";
        this._timeText = this.getChild("time").asTextField;
        this._re = this.getChild("re").asButton;
        this.createMap();
        this.startTimer();
        this.addListen();
    };
    MineSweeper.prototype.startTimer = function () {
        var _this = this;
        this._timeId && clearInterval(this._timeId);
        this._time = 0;
        this._timeText.text = 0 + "";
        this._timeId = setInterval(function () {
            _this._timeText.text = (--_this._time) + "";
        }, 1000);
    };
    MineSweeper.prototype.addListen = function () {
        this._board.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchGrid, this);
        MyEvent.add(MineDate.MAP_UPDATE, this.mapUpdate, this);
        MyEvent.add(MineDate.GAME_OVER, this.gameOver, this);
        this._re.addClickListener(this.reStart, this);
    };
    MineSweeper.prototype.removeListen = function () {
        this._board.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchGrid, this);
        MyEvent.off(MineDate.MAP_UPDATE, this.mapUpdate, this);
        MyEvent.off(MineDate.GAME_OVER, this.gameOver, this);
    };
    MineSweeper.prototype.createMap = function () {
        this._mapList = [];
        for (var i = 0; i < this._maxRow; i++) {
            this._mapList[i] = [];
            for (var j = 0; j < this._maxCol; j++) {
                var item = this.createObject("MineSweeperGrid");
                item.x = 10 + 35 * j;
                item.y = 350 + 35 * i;
                item.setPosition(i, j);
                this.addChild(item);
                this._mapList[i][j] = item;
            }
        }
    };
    MineSweeper.prototype.touchGrid = function (evt) {
        // console.log(evt.stageX, evt.stageY);
        var row = Math.floor((evt.stageY - 350) / this._gridSize);
        var col = Math.floor((evt.stageX - 10) / this._gridSize);
        // console.log(row, col);
        if (!this._mapList[row][col] ||
            !this._mapList[row][col]._touch)
            return;
        MineSweeperModel.instance.openMine(row, col);
    };
    MineSweeper.prototype.mapUpdate = function (data) {
        var _this = this;
        console.log(data); // 导致延迟严重
        // var st = "";
        // data.forEach(element => {
        // 	st += element.toString()+"___";
        // });
        // console.log(st);
        var len = data.length;
        var _loop_1 = function (i) {
            var row = data[i][0], col = data[i][1], mineNum = data[i][2];
            var target = this_1._mapList[row][col];
            var id = setTimeout(function () {
                target instanceof MineSweeperGrid && target.disappear();
                clearTimeout(id);
                if (mineNum != 0) {
                    // if (!target) continue;
                    var item = _this.createObject("MineNum").asCom;
                    item.x = target.x;
                    item.y = target.y;
                    item.getChild("num").text = mineNum + "";
                    _this.addChildAt(item, 10);
                    _this._mapList[row][col] = item;
                }
                else {
                    _this._mapList[row][col] = null;
                }
            }, i * 1);
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
    };
    MineSweeper.prototype.reStart = function () {
        this.clearAll();
        this._timeId && clearInterval(this._timeId) && (this._timeId = 0);
        this._board.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchGrid, this);
        MineSweeperModel.instance.init(this._maxRow, this._maxCol, this._mineNum);
        this.createMap();
        this.startTimer();
        // setTimeout(function () {
        // MineSweeperModel.instance.kaiGua()
        // }, 1000);
    };
    MineSweeper.prototype.gameOver = function (data) {
        var target = this._mapList[data.row][data.col];
        var item = this.createObject("Mine").asCom;
        item.x = target.x;
        item.y = target.y;
        if (data.boom) {
            item.getChild("boom").visible = true;
            this._timeId && clearInterval(this._timeId) && (this._timeId = 0);
            this._board.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchGrid, this);
        }
        this.addChild(item);
        target.parent &&
            target.removeFromParent();
        this._mapList[data.row][data.col] = item;
    };
    MineSweeper.prototype.clearAll = function () {
        console.log(this._mapList);
        this._mapList.forEach(function (r) {
            r.forEach(function (e) {
                if (e && e.parent) {
                    e.dispose();
                }
            });
        });
    };
    MineSweeper.prototype.dispose = function () {
        this.removeListen();
        _super.prototype.dispose.call(this);
    };
    return MineSweeper;
}(MyComponent));
__reflect(MineSweeper.prototype, "MineSweeper");
