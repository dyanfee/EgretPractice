var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MineEnum = (function () {
    function MineEnum() {
    }
    MineEnum.Empty = 0;
    MineEnum.Mine = -1;
    MineEnum.SEARCH = 1;
    return MineEnum;
}());
__reflect(MineEnum.prototype, "MineEnum");
//# sourceMappingURL=MineEnum.js.map