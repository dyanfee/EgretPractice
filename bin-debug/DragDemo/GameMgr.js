var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DragPro;
(function (DragPro) {
    var GameMgr = (function () {
        function GameMgr() {
        }
        Object.defineProperty(GameMgr, "instance", {
            get: function () {
                return this._inst || (this._inst = new GameMgr());
            },
            enumerable: true,
            configurable: true
        });
        GameMgr.prototype.start = function () {
        };
        return GameMgr;
    }());
    DragPro.GameMgr = GameMgr;
    __reflect(GameMgr.prototype, "DragPro.GameMgr");
})(DragPro || (DragPro = {}));
//# sourceMappingURL=GameMgr.js.map