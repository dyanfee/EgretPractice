var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AstarPra;
(function (AstarPra) {
    var NodeMgr = (function () {
        function NodeMgr() {
        }
        return NodeMgr;
    }());
    AstarPra.NodeMgr = NodeMgr;
    __reflect(NodeMgr.prototype, "AstarPra.NodeMgr");
})(AstarPra || (AstarPra = {}));
//# sourceMappingURL=NodeMgr.js.map