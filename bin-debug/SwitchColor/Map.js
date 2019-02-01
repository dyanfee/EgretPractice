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
var Map1 = (function (_super) {
    __extends(Map1, _super);
    function Map1() {
        return _super.call(this) || this;
    }
    Map1.prototype.onload = function () {
        this._re = this.getChild("re").asButton;
        this._re.addClickListener(this.reStart, this);
        this._scoreText = this.getChild("score").asTextField;
        this._timeText = this.getChild("time").asTextField;
        this.addListen();
    };
    Map1.prototype.addListen = function () {
        MyEvent.add(Data.NEXT_ROUND, this.nextRound, this);
    };
    Map1.prototype.removeListen = function () {
        MyEvent.off(Data.NEXT_ROUND, this.nextRound, this);
    };
    Map1.prototype.init = function () {
        this.Timer();
        this._score = 0;
        this._roundNum = 1;
        this._maxGridNum = 9;
        this._colorDefaultNum = 50;
        this.clearGrid();
        this._gridList = [];
        this.createGrid();
        // setInterval(() => {
        // 	this.nextRound();
        // }, 500)
    };
    Map1.prototype.reStart = function () {
        this.setscore(0);
        this._timeId && clearInterval(this._timeId);
        this.init();
    };
    Map1.prototype.setscore = function (val) {
        this._scoreText.text = val.toString();
    };
    Map1.prototype.Timer = function () {
        var _this = this;
        this._time = 60;
        this._timeText.text = this._time + "";
        this._timeId = setInterval(function () {
            if (_this._time == 0) {
                _this.clearGrid();
                clearInterval(_this._timeId);
            }
            _this._timeText.text = (_this._time--).toString();
        }, 1000);
    };
    Map1.prototype.createGrid = function () {
        var gridNum // 一行的格子数
        , gridTotal // 总格子数
        , margin // 边缘宽度
        , pad = 20 // 格子间距
        , gridwh // 格子宽高
        , color; // 格子颜色
        if (this._roundNum < this._maxGridNum) {
            gridNum = this._roundNum + 1;
        }
        else {
            gridNum = this._maxGridNum;
        }
        gridTotal = Math.pow(gridNum, 2);
        // 逻辑计算 计算边缘 计算格子宽度 随机不同颜色格子位置
        pad = (this._maxGridNum - gridNum + 2) / this._maxGridNum * pad;
        gridwh = (this._maxGridNum - 1.7) / this._maxGridNum * (Data.getWidth / gridNum);
        margin = (Data.getWidth - pad * (gridNum - 1) - gridwh * gridNum) / 2;
        this._diffGrid = Math.floor(Math.random() * gridTotal);
        color = this.setColor(); //得到随机颜色
        for (var i = 0; i < gridTotal; i++) {
            var item = this.createObject("Grid").asCom;
            var graph = item.getChildAt(0).asGraph;
            graph.width = graph.height =
                item.width = item.height = gridwh; // 设置格子的宽高
            // 设置格子位置
            item.x = margin + (pad + item.width) * (i % gridNum);
            item.y = 345 + margin + (pad + item.height) * Math.floor(i / gridNum);
            graph.color = color;
            // 随机得到的不同颜色格子设置点击
            if (i == this._diffGrid) {
                graph.color = this._colorRound;
                item.isKey = true;
                item.addListen();
            }
            this.addChild(item);
            this._gridList.push(item);
        }
    };
    Map1.prototype.nextRound = function () {
        this._score++;
        this._roundNum++;
        this.clearGrid();
        this.createGrid();
        this.setscore(this._score);
    };
    Map1.prototype.setColor = function () {
        var r, g, b;
        r = Math.floor(Math.random() * (0xff - this._colorDefaultNum) + this._colorDefaultNum);
        g = Math.floor(Math.random() * (0xff - this._colorDefaultNum) + this._colorDefaultNum);
        b = Math.floor(Math.random() * (0xff - this._colorDefaultNum) + this._colorDefaultNum);
        if (this._colorDefaultNum > 5) {
            this._colorDefaultNum -= 3;
        }
        // 随机改变一些颜色
        this._colorRound = ((r - this._colorDefaultNum) << 16)
            + ((g - this._colorDefaultNum) << 8)
            + b - this._colorDefaultNum;
        var color = (r << 16)
            + (g << 8)
            + b;
        return color;
    };
    Map1.prototype.clearGrid = function () {
        this._gridList &&
            this._gridList.forEach(function (e) {
                if (e && e.parent)
                    e.removeFromParent();
                e.dispose();
            });
        this._gridList = [];
    };
    Map1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeListen();
    };
    return Map1;
}(MyComponent));
__reflect(Map1.prototype, "Map1");
