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
var Map2 = (function (_super) {
    __extends(Map2, _super);
    function Map2() {
        var _this = _super.call(this) || this;
        _this._gridNum = 2;
        _this._maxBits = 10;
        return _this;
    }
    Map2.prototype.onload = function () {
        this._first = this.getChild("input1").asTextField;
        this._second = this.getChild("input2").asTextField;
        this._result = this.getChild("answer").asTextField;
    };
    Map2.prototype.init = function () {
        this._score = 0;
        this._operatorList = [];
        this.createOperator();
        this.addListen();
        GameMgr.instance.init(this);
        GameMgr.instance.setTime();
    };
    Map2.prototype.addListen = function () {
        MyEvent.add(Data.NEXT_ROUND, this.nextRound, this);
    };
    Map2.prototype.removeListen = function () {
        MyEvent.off(Data.NEXT_ROUND, this.nextRound, this);
    };
    Map2.prototype.createOperator = function () {
        this.clearGrid();
        var oplist = [0, 1, 2, 3];
        var method = this.creAlgorithm();
        for (var i = 0; i < 4; i++) {
            var c = oplist.splice(Math.floor(Math.random() * oplist.length), 1)[0];
            console.log(c);
            var item = ComPools.instance.getCom("PrimaryMathGrid");
            item.x = 220 + (item.width + 40) * (i % this._gridNum);
            item.y = 680 + (item.height + 30) * Math.floor(i / 2);
            item.initGrid(c);
            if (c == method) {
                item.setKey(true);
            }
            this.addChild(item);
            this._operatorList.push(item);
        }
    };
    Map2.prototype.creAlgorithm = function () {
        var randomMethod = Math.floor(Math.random() * 4);
        var i = Math.ceil(Math.random() * this._maxBits);
        var j = Math.ceil(Math.random() * this._maxBits);
        var k;
        switch (randomMethod) {
            case OperatorEnum.ADDITION:
                k = i + j;
                break;
            case OperatorEnum.SUBTRACTIN:
                k = i - j;
                break;
            case OperatorEnum.MULTIPLICATION:
                k = i * j;
                break;
            case OperatorEnum.DIVISION:
                var temp = void 0;
                k = i * j;
                temp = i;
                i = k;
                k = temp;
                break;
        }
        this._first.text = i + "";
        this._second.text = j + "";
        this._result.text = k + "";
        return randomMethod;
    };
    Map2.prototype.nextRound = function () {
        this._score++;
        GameMgr.instance.setScore = this._score;
        // this._maxBits += 10;
        this.clearGrid();
        this.createOperator();
    };
    Map2.prototype.reStart = function () {
        GameMgr.instance.setScore = this._score = 0;
        this._maxBits = 10;
        this.createOperator();
        GameMgr.instance.setTime();
    };
    Map2.prototype.gameOver = function () {
        this.clearGrid();
    };
    Map2.prototype.clearGrid = function () {
        this._operatorList
            && this._operatorList.forEach(function (e) {
                ComPools.instance.disposeCom("PrimaryMathGrid", e);
                e.release();
            });
        this._operatorList = [];
    };
    Map2.prototype.dispose = function () {
        this.removeListen();
        _super.prototype.dispose.call(this);
    };
    return Map2;
}(MyComponent));
__reflect(Map2.prototype, "Map2");
var OperatorEnum = (function () {
    function OperatorEnum() {
    }
    OperatorEnum.ADDITION = 0;
    OperatorEnum.SUBTRACTIN = 1;
    OperatorEnum.MULTIPLICATION = 2;
    OperatorEnum.DIVISION = 3;
    return OperatorEnum;
}());
__reflect(OperatorEnum.prototype, "OperatorEnum");
//# sourceMappingURL=Map.js.map