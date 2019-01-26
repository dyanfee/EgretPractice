var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MineSweeperModel = (function () {
    function MineSweeperModel() {
        this._isFirstTouch = 1;
    }
    Object.defineProperty(MineSweeperModel, "instance", {
        get: function () {
            return this._inst || (this._inst = new MineSweeperModel);
        },
        enumerable: true,
        configurable: true
    });
    MineSweeperModel.prototype.init = function (row, col, mine) {
        this.logicMap = [];
        this._searchArr = [];
        this._isFirstTouch = 1;
        for (var i = 0; i < row; i++) {
            this.logicMap[i] = [];
            this._searchArr[i] = [];
            for (var j = 0; j < col; j++) {
                this.logicMap[i][j] = MineEnum.Empty;
                this._searchArr[i][j] = MineEnum.Empty;
            }
        }
        this._mapRow = row;
        this._mapCol = col;
        this.createMine(mine);
    };
    MineSweeperModel.prototype.createMine = function (num) {
        var row, col;
        while (num > 0) {
            row = Math.floor(Math.random() * this._mapRow);
            col = Math.floor(Math.random() * this._mapCol);
            if (this.logicMap[row][col] == 0) {
                this.logicMap[row][col] = MineEnum.Mine;
                num--;
            }
        }
        // console.log(this.logicMap);
    };
    MineSweeperModel.prototype.kaiGua = function () {
        for (var i = 0; i < this._mapRow; i++) {
            for (var j = 0; j < this._mapCol; j++) {
                if (this.logicMap[i][j] != MineEnum.Mine) {
                    this.openMine(i, j);
                }
            }
        }
    };
    MineSweeperModel.prototype.openMine = function (row, col) {
        if (this._isFirstTouch != 0) {
            this._isFirstTouch--;
            if (this.logicMap[row][col] == MineEnum.Mine) {
                this.createMine(1);
                this.logicMap[row][col] = MineEnum.Empty;
            }
        }
        if (this.logicMap[row][col] == MineEnum.Mine) {
            console.log("GameOver!");
            MyEvent.dispach(MineDate.GAME_OVER, { row: row, col: col, "boom": true });
            this.logicMap[row][col] = MineEnum.Empty;
            this.openMinePosition();
        }
        else {
            var mineNum = this.findMineCount(row, col);
            if (mineNum == 0) {
                this._updateList = [];
                var start = egret.getTimer();
                this.expandMap(row, col);
                MyEvent.dispach(MineDate.MAP_UPDATE, this._updateList);
                var stop_1 = egret.getTimer();
                console.log("耗时：" + (stop_1 - start));
                // console.log(this._searchArr);
            }
            else {
                MyEvent.dispach(MineDate.MAP_UPDATE, [[row, col, mineNum]]);
            }
        }
    };
    //  显示所有地雷
    MineSweeperModel.prototype.openMinePosition = function () {
        for (var i = 0; i < this._mapRow; i++) {
            for (var j = 0; j < this._mapCol; j++) {
                if (this.logicMap[i][j] == MineEnum.Mine) {
                    MyEvent.dispach(MineDate.GAME_OVER, { "row": i, "col": j });
                }
            }
        }
    };
    // 自动展开空位置
    MineSweeperModel.prototype.expandMap = function (row, col) {
        if (this._searchArr[row][col])
            return;
        this._searchArr[row][col] = 1;
        this._updateList.push([row, col, 0]);
        var mineNum = 0;
        if (this.logicMap[row][col] == MineEnum.Mine)
            return;
        // MyEvent.dispach(MineDate.MAP_UPDATE, { row, col }) // 发送地图更新消息
        for (var i = row - 1; i <= row + 1; i++) {
            for (var j = col - 1; j <= col + 1; j++) {
                if (i == row && j == col)
                    continue;
                if (i >= this._mapRow || i < 0 || j >= this._mapCol || j < 0)
                    continue;
                mineNum = this.findMineCount(i, j);
                if (mineNum == 0) {
                    this.expandMap(i, j);
                }
                else {
                    if (this._searchArr[i][j])
                        continue;
                    this._searchArr[i][j] = 1;
                    // MyEvent.dispach(MineDate.MAP_UPDATE, { "row": i, "col": j, mineNum }) //发送地图更新消息
                    this._updateList.push([i, j, mineNum]);
                }
            }
        }
    };
    // 返回目标周围雷数
    MineSweeperModel.prototype.findMineCount = function (row, col) {
        var count = 0;
        for (var i = row - 1; i <= row + 1; i++) {
            for (var j = col - 1; j <= col + 1; j++) {
                if (i == row && j == col)
                    continue;
                if (i > this._mapRow - 1 || i < 0 || j > this._mapCol - 1 || j < 0)
                    continue;
                if (this.logicMap[i][j] == MineEnum.Mine)
                    count++;
            }
        }
        return count;
    };
    MineSweeperModel.prototype.findMineMap = function (row, col) {
        MyEvent.dispach(MineDate.MAP_UPDATE);
    };
    return MineSweeperModel;
}());
__reflect(MineSweeperModel.prototype, "MineSweeperModel");
var MineDate = (function () {
    function MineDate() {
    }
    MineDate.MAP_UPDATE = "mapUpdate";
    MineDate.GAME_OVER = "game_over";
    return MineDate;
}());
__reflect(MineDate.prototype, "MineDate");
//# sourceMappingURL=MineSweeperModel.js.map