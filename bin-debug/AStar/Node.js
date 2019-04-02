var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AstarPra;
(function (AstarPra) {
    var Node = (function () {
        function Node(x, y) {
            this.walkable = true;
            this.row = x;
            this.col = y;
        }
        return Node;
    }());
    AstarPra.Node = Node;
    __reflect(Node.prototype, "AstarPra.Node");
})(AstarPra || (AstarPra = {}));
//# sourceMappingURL=Node.js.map