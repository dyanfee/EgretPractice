var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TrailingCs = (function (_super) {
    __extends(TrailingCs, _super);
    function TrailingCs() {
        var _this = _super.call(this) || this;
        _this.LineArr = [];
        return _this;
    }
    TrailingCs.prototype.myload = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouch, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.clean, this);
        this.draw();
    };
    TrailingCs.prototype.draw = function () {
        console.log("===========");
        var t = new egret.Shape();
        t.graphics.lineStyle(1, 0x009393);
        t.graphics.beginFill(0xCE0000);
        t.graphics.moveTo(100, 100);
        t.graphics.lineTo(200, 200);
        t.graphics.lineTo(200, 100);
        t.graphics.lineTo(100, 100);
        t.graphics.endFill();
        egret.lifecycle.stage.addChild(t);
        var g = new fairygui.GGraph();
        g.setSize(100, 100);
        g.setXY(100, 200);
        g.drawRect(2, 0xff, 255, 0x00ff00, 255);
        // g.setNativeObject(t);
        this.addChild(g);
    };
    TrailingCs.prototype.dis = function (x1, x2, y1, y2) {
        var x1 = x1;
        //获取第一点的X坐标
        var y1 = eval(y1);
        //获取第一点的Y坐标
        var x2 = eval(x2);
        //获取第二点的X坐标
        var y2 = eval(y2);
        //获取第二点的Y坐标
        var calX = x2 - x1;
        var calY = y2 - y1;
        return Math.pow((calX * calX + calY * calY), 0.5);
    };
    TrailingCs.prototype.createLine = function (x, y) {
        var effect = this.createObject("effect");
        effect['type'] = 0;
        effect.setPivot(0.5, 0.5, true);
        effect.x = x;
        effect.y = y;
        effect.scaleX = 0.2;
        effect.scaleY = 0.2;
        this.addChild(effect);
        this.LineArr.push(effect);
    };
    TrailingCs.prototype.onStageTouch = function (evt) {
        if (evt.type == "touchBegin") {
        }
        else if (evt.type == "touchMove") {
            if (this.LineArr.length > 0) {
                var x1 = this.LineArr[this.LineArr.length - 1].x;
                var y1 = this.LineArr[this.LineArr.length - 1].y;
                var x2 = evt.stageX;
                var y2 = evt.stageY;
                var dis = this.dis(x1, x2, y1, y2);
                if (dis > 5) {
                    var point1X = (x1 + x2) / 2;
                    var point1Y = (y1 + y2) / 2;
                    var point2X = (x1 + point1X) / 2;
                    var point2Y = (y1 + point1Y) / 2;
                    var point3X = (point2X + x2) / 2;
                    var point3Y = (point2Y + y2) / 2;
                    var center1X = (x1 + point2X) / 2;
                    var center1Y = (y1 + point2Y) / 2;
                    var center2X = (point2X + point1X) / 2;
                    var center2Y = (point2Y + point1Y) / 2;
                    var center3X = (point1X + point3X) / 2;
                    var center3Y = (point1Y + point3Y) / 2;
                    var center4X = (point3X + x2) / 2;
                    var center4Y = (point3Y + y2) / 2;
                    this.createLine(center1X, center1Y);
                    this.createLine(point2X, point2Y);
                    this.createLine(center2X, center2Y);
                    this.createLine(point1X, point1Y);
                    this.createLine(center3X, center3Y);
                    this.createLine(point3X, point3Y);
                    this.createLine(center4X, center4Y);
                }
            }
            this.createLine(evt.stageX, evt.stageY);
        }
        else if (evt.type == "touchEnd") {
        }
    };
    TrailingCs.prototype.clean = function () {
        if (this.LineArr.length > 0) {
            for (var a = 0; a < this.LineArr.length; a++) {
                // console.log(this.LineArr[a]['type']);
                if (this.LineArr[a].scaleX < 0.6 && this.LineArr[a]['type'] == 0) {
                    this.LineArr[a].scaleX = this.LineArr[a].scaleX + 0.06;
                    this.LineArr[a].scaleY = this.LineArr[a].scaleY + 0.06;
                }
                else {
                    this.LineArr[a]['type'] = 1;
                    this.LineArr[a].scaleX = this.LineArr[a].scaleX - 0.06;
                    this.LineArr[a].scaleY = this.LineArr[a].scaleY - 0.06;
                    if (this.LineArr[a].scaleX <= 0) {
                        this.removeChild(this.LineArr[a]);
                        this.LineArr.splice(a, 1);
                        a--;
                    }
                }
            }
        }
    };
    return TrailingCs;
}(MyComponent));
__reflect(TrailingCs.prototype, "TrailingCs");
//# sourceMappingURL=asd.js.map