var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data = (function () {
    function Data() {
    }
    Object.defineProperty(Data, "getWidth", {
        // 获取屏幕宽度
        get: function () {
            return egret.lifecycle.stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data, "getHeight", {
        // 获取屏幕高度
        get: function () {
            return egret.lifecycle.stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Data.pkgName = "practiceUI";
    //-----EVENT------//
    Data.NEXT_ROUND = "next_round";
    Data.ERROR_ANSWER = "error_answer";
    return Data;
}());
__reflect(Data.prototype, "Data");
//# sourceMappingURL=Data.js.map