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
var AstarPra;
(function (AstarPra) {
    var SeachMap = (function (_super) {
        __extends(SeachMap, _super);
        function SeachMap() {
            var _this = _super.call(this) || this;
            _this._obstacle = 0.3;
            return _this;
        }
        SeachMap.prototype.myload = function () {
            this._re = this.getChild("re").asButton;
            this._start = this.getChild("start").asButton;
            this.initUi();
            this.addListen();
        };
        SeachMap.prototype.initUi = function () {
            var _this = this;
            this.gridList = [];
            for (var i = 0; i < AstarPra.Data.MAX_ROW; i++) {
                this.gridList[i] = [];
                for (var j = 0; j < AstarPra.Data.MAX_COL; j++) {
                    var item = this.createObject("translucenceGrid");
                    this.gridList[i][j] = item;
                    item.x = 20 + (item.width + 2) * j;
                    item.y = 300 + (item.height + 2) * i;
                    item.row = i;
                    item.col = j;
                    this.addChild(item);
                }
            }
            setTimeout(function () {
                _this.createMap();
                AstarPra.AStarModel.instance.loadMap(_this);
            }, 300);
        };
        SeachMap.prototype.addListen = function () {
            this._re.addClickListener(this.re, this);
            this._start.addClickListener(this.start, this);
            MyEvent.add(AstarPra.Data.TOUCH_GRID, this.touch, this);
        };
        SeachMap.prototype.removeListen = function () {
            this._re.removeClickListener(this.re, this);
            this._start.removeClickListener(this.start, this);
            MyEvent.off(AstarPra.Data.TOUCH_GRID, this.touch, this);
        };
        SeachMap.prototype.re = function () {
            var self = this;
            for (var i = 0; i < AstarPra.Data.MAX_ROW; i++) {
                for (var j = 0; j < AstarPra.Data.MAX_COL; j++) {
                    AstarPra.AStarModel.instance.setWalkable(i, j, true);
                    self.gridList[i][j].control = 0;
                }
            }
            AstarPra.AStarModel.instance.reSetNode();
            this.startGrid = null;
            this.endGrid = null;
            this.createMap();
        };
        SeachMap.prototype.start = function () {
            var self = this;
            var time = egret.getTimer();
            if (!AstarPra.AStarModel.instance.getStartNode)
                return;
            // 启动路径搜索
            AstarPra.AStarModel.instance.startAStar();
            console.log("费时：", (egret.getTimer() - time) / 1000 + "s");
            if (!AstarPra.AStarModel.instance.path)
                return;
            // 绘制路径地图
            var len = AstarPra.AStarModel.instance.path.length;
            var _loop_1 = function (i) {
                setTimeout(function () {
                    var row = AstarPra.AStarModel.instance.path[i].row;
                    var col = AstarPra.AStarModel.instance.path[i].col;
                    self.gridList[row][col].control = 3;
                    if (i == 0)
                        self.gridList[row][col].control = 1;
                    if (i == len - 1)
                        self.gridList[row][col].control = 2;
                }, i * 100);
            };
            for (var i = 0; i < len; i++) {
                _loop_1(i);
            }
        };
        // 创建 地图 手动
        SeachMap.prototype.createMap = function () {
            var self = this;
            for (var i = 0; i < AstarPra.Data.MAX_ROW; i++) {
                for (var j = 0; j < AstarPra.Data.MAX_COL; j++) {
                    var res = Math.random() < this._obstacle ? false : true;
                    if (!res) {
                        AstarPra.AStarModel.instance.setWalkable(i, j, false);
                        self.gridList[i][j].control = 4;
                    }
                }
            }
            // AStarModel.instance.loadMap(this);
        };
        SeachMap.prototype.touch = function (data) {
            var self = this;
            var row = data.row;
            var col = data.col;
            if (!AstarPra.AStarModel.instance.getWalkable(row, col))
                return;
            if (AstarPra.Data.touchNum == 0) {
                if (self.startGrid)
                    this.startGrid.control = 0;
                // 设置起点
                AstarPra.AStarModel.instance.setStartNode(row, col);
                self.gridList[row][col].control = 1;
                self.startGrid = self.gridList[row][col];
                AstarPra.Data.touchNum = 1;
            }
            else {
                if (self.endGrid)
                    this.endGrid.control = 0;
                // 设置终点
                AstarPra.AStarModel.instance.setEndNode(row, col);
                self.gridList[row][col].control = 2;
                self.endGrid = self.gridList[row][col];
                AstarPra.Data.touchNum = 0;
            }
        };
        return SeachMap;
    }(MyComponent));
    AstarPra.SeachMap = SeachMap;
    __reflect(SeachMap.prototype, "AstarPra.SeachMap");
})(AstarPra || (AstarPra = {}));
//# sourceMappingURL=SeachMap.js.map