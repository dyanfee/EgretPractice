var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PracticePro;
(function (PracticePro) {
    /**
     * A* 寻路
     */
    var AStarModel = (function () {
        function AStarModel() {
            this._straightCost = 10; // 直行耗费
            this._diagCost = 14; // 斜行耗费
            this.init();
        }
        Object.defineProperty(AStarModel, "instance", {
            get: function () {
                return this._inst || (this._inst = new AStarModel);
            },
            enumerable: true,
            configurable: true
        });
        AStarModel.prototype.loadMap = function (map) {
            this._map = map;
        };
        AStarModel.prototype.setStartNode = function (x, y) {
            if (this._startNode) {
            }
            this._startNode = this._nodes[x][y];
            this._startNode.g = 0;
            this._startNode.h = this._heuristic(this._startNode);
            this._startNode.f = this._startNode.g + this._startNode.h;
        };
        AStarModel.prototype.setEndNode = function (x, y) {
            this._endNode = this._nodes[x][y];
        };
        AStarModel.prototype.setWalkable = function (x, y, e) {
            this._nodes[x][y].walkable = e;
        };
        AStarModel.prototype.getWalkable = function (x, y) {
            return this._nodes[x][y].walkable;
        };
        Object.defineProperty(AStarModel.prototype, "getStartNode", {
            get: function () {
                return this._startNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AStarModel.prototype, "getEndNode", {
            get: function () {
                return this._endNode;
            },
            enumerable: true,
            configurable: true
        });
        AStarModel.prototype.reSetNode = function () {
            this._startNode = null;
            this._endNode = null;
            this._path = [];
            this.init();
        };
        // 初始化节点
        AStarModel.prototype.init = function () {
            console.log("init Astar");
            this._nodes = [];
            this._open = [];
            this._close = [];
            for (var i = 0; i < PracticePro.Data.MAX_ROW; i++) {
                this._nodes[i] = [];
                for (var j = 0; j < PracticePro.Data.MAX_COL; j++) {
                    this._nodes[i][j] = new PracticePro.Node(i, j);
                }
            }
            this._heuristic = this.manhattan;
        };
        AStarModel.prototype.startAStar = function () {
            var node = this._startNode;
            var k = 0;
            while (node != this._endNode) {
                // let startX = Math.max(0, node.row - 1);
                // let endX = Math.min(node.row + 1, Data.MAX_ROW-1);
                // let startY = Math.max(0, node.col - 1);
                // let endY = Math.min(node.col + 1, Data.MAX_COL-1);
                // for (let i = startX; i <= endX; i++) {
                // 	for (let j = startY; j <= endY; j++) {
                for (var i = node.row - 1; i <= node.row + 1; i++) {
                    for (var j = node.col - 1; j <= node.col + 1; j++) {
                        if (i == node.row && j == node.col)
                            continue;
                        if (i > PracticePro.Data.MAX_ROW - 1 || i < 0 || j > PracticePro.Data.MAX_COL - 1 || j < 0)
                            continue;
                        // 不可以斜行
                        if (i != node.row && j != node.col)
                            continue;
                        var target = this._nodes[i][j];
                        if (!target.walkable)
                            continue;
                        // 不可行走
                        // if (!target.walkable ||
                        // 	!this._nodes[node.row][target.col] ||
                        // 	!this._nodes[target.row][node.col])
                        // 	continue;
                        // this._map.gridList[node.row][node.col].control = 6;
                        this._map.gridList[i][j].control = 5;
                        var cost = this._straightCost;
                        // 如果允许斜行 花费变化
                        if (!(target.row == node.row || target.col == node.col))
                            cost = this._diagCost;
                        var g = node.g + cost;
                        var h = this._heuristic(target);
                        var f = g + h;
                        // 如果
                        if (this.isOpen(target) || this.isClose(target)) {
                            if (target.f > f) {
                                target.f = f;
                                target.g = g;
                                target.h = h;
                                target.parent = node;
                            }
                        }
                        else {
                            target.f = f;
                            target.g = g;
                            target.h = h;
                            target.parent = node;
                            this._open.push(target);
                        }
                        if (!this.isClose(node))
                            this._close.push(node);
                        // console.log("close", this._close);
                        // console.log("open", this._open)
                        // 所有节点搜索完都没有找到终点 结束
                        if (this._open.length == 0) {
                            console.log("没有路径可以到达终点！");
                            return false;
                        }
                        // 对open查找f最小
                        var openLen = this._open.length;
                        for (var m = 0; m < openLen; m++) {
                            for (var n = m + 1; n < openLen; n++) {
                                if (this._open[m].f > this._open[n].f) {
                                    var temp = this._open[m];
                                    this._open[m] = this._open[n];
                                    this._open[n] = temp;
                                }
                            }
                        }
                    }
                }
                node = this._open.shift();
            }
            this.buildPath();
            return true;
        };
        AStarModel.prototype.buildPath = function () {
            this._path = [];
            var node = this._endNode;
            this._path.push(node);
            while (node != this._startNode) {
                node = node.parent;
                this._path.unshift(node); // 将节点放到第一位
            }
        };
        Object.defineProperty(AStarModel.prototype, "path", {
            get: function () {
                return this._path;
            },
            enumerable: true,
            configurable: true
        });
        AStarModel.prototype.isOpen = function (node) {
            var len = this._open.length;
            // TODO:优化查找数组中元素方案
            for (var i = 0; i < len; i++) {
                if (this._open[i] == node) {
                    return true;
                }
            }
            return false;
        };
        AStarModel.prototype.isClose = function (node) {
            var len = this._close.length;
            // TODO:优化查找数组中元素方案
            for (var i = 0; i < len; i++) {
                if (this._close[i] == node) {
                    return true;
                }
            }
            return false;
        };
        // 曼哈顿距离
        AStarModel.prototype.manhattan = function (node) {
            return ((PracticePro.Data.MAX_ROW - node.row) + (PracticePro.Data.MAX_COL - node.col)) * this._straightCost;
        };
        return AStarModel;
    }());
    PracticePro.AStarModel = AStarModel;
    __reflect(AStarModel.prototype, "PracticePro.AStarModel");
})(PracticePro || (PracticePro = {}));
