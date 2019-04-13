var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MyRender = (function () {
    function MyRender() {
    }
    MyRender.prototype.create = function () {
        var render = egret.sys.systemRenderer;
        // render.render()
    };
    return MyRender;
}());
__reflect(MyRender.prototype, "MyRender");
//# sourceMappingURL=MyRender.js.map