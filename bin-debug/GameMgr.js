var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameMgr = (function () {
    function GameMgr() {
    }
    Object.defineProperty(GameMgr, "instance", {
        get: function () {
            if (!this._instance)
                this._instance = new GameMgr();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameMgr.prototype.init = function (target) {
        this._target = target;
        this._re = target.getChild("re").asButton;
        this._re.addClickListener(target.reStart, target);
        this._scoreText = target.getChild("score").asTextField;
        this._timeText = target.getChild("time").asTextField;
        this._scoreText.text = "0";
    };
    Object.defineProperty(GameMgr.prototype, "setScore", {
        set: function (val) {
            this._scoreText.text = val + "";
        },
        enumerable: true,
        configurable: true
    });
    GameMgr.prototype.setTime = function () {
        var _this = this;
        this._time = 60;
        this._timeText.text = 60 + "";
        this._timeId && clearInterval(this._timeId);
        this._timeId = setInterval(function () {
            _this._time--;
            _this._timeText.text = _this._time + "";
            if (_this._time == 0) {
                clearInterval(_this._timeId);
                _this._target.gameOver();
            }
        }, 1000);
    };
    GameMgr.prototype.destory = function () {
        GameMgr._instance = null;
    };
    return GameMgr;
}());
__reflect(GameMgr.prototype, "GameMgr");
