var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KeyBoardMgr = (function () {
    function KeyBoardMgr() {
        this.keys = {};
    }
    Object.defineProperty(KeyBoardMgr, "instance", {
        get: function () {
            if (!this._inst) {
                this._inst = new KeyBoardMgr();
                this._inst.addListen();
            }
            return this._inst;
        },
        enumerable: true,
        configurable: true
    });
    KeyBoardMgr.prototype.addListen = function () {
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
    };
    KeyBoardMgr.prototype.keyDown = function (e) {
        this.keys[e.keyCode] = 1;
    };
    KeyBoardMgr.prototype.keyUp = function (e) {
        this.keys[e.keyCode] = 0;
    };
    KeyBoardMgr.isDown = function (keyCode) {
        if (KeyBoardMgr.instance.keys[keyCode] && KeyBoardMgr.instance.keys[keyCode] == 1)
            return 1;
        return 0;
    };
    KeyBoardMgr.UP = 38;
    KeyBoardMgr.DOWN = 40;
    KeyBoardMgr.LEFT = 37;
    KeyBoardMgr.RIGHT = 39;
    KeyBoardMgr.W = 87;
    KeyBoardMgr.S = 83;
    KeyBoardMgr.A = 65;
    KeyBoardMgr.D = 68;
    return KeyBoardMgr;
}());
__reflect(KeyBoardMgr.prototype, "KeyBoardMgr");
//# sourceMappingURL=KeyBoardMgr.js.map