var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PracticePro;
(function (PracticePro) {
    var Data = (function () {
        function Data() {
        }
        Data.MAX_ROW = 28;
        Data.MAX_COL = 20;
        Data.touchNum = 0;
        //=======================event========================//
        Data.TOUCH_GRID = "touch_grid";
        return Data;
    }());
    PracticePro.Data = Data;
    __reflect(Data.prototype, "PracticePro.Data");
})(PracticePro || (PracticePro = {}));
//# sourceMappingURL=AStarData.js.map