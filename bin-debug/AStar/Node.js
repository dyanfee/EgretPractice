var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PracticePro;
(function (PracticePro) {
    var Node = (function () {
        function Node(x, y) {
            this.walkable = true;
            this.row = x;
            this.col = y;
        }
        return Node;
    }());
    PracticePro.Node = Node;
    __reflect(Node.prototype, "PracticePro.Node");
})(PracticePro || (PracticePro = {}));
