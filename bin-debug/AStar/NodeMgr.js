var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PracticePro;
(function (PracticePro) {
    var NodeMgr = (function () {
        function NodeMgr() {
        }
        return NodeMgr;
    }());
    PracticePro.NodeMgr = NodeMgr;
    __reflect(NodeMgr.prototype, "PracticePro.NodeMgr");
})(PracticePro || (PracticePro = {}));
