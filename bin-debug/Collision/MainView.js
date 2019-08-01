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
var Collision;
(function (Collision) {
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            return _super.call(this) || this;
        }
        MainView.prototype.myload = function () {
            var self = this;
            self._start = self.getChild("start").asGraph;
            self._end = self.getChild("end").asGraph;
            self._circle = self.getChild("circle").asGraph;
            self._rect = self.getChild("rect").asGraph;
            self._start.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.clickStart, self);
            self._end.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.clickEnd, self);
            self._circle.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.clickRect, self);
            self._rect.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.clickCircle, self);
            self._line = new egret.Shape();
            self.displayListContainer.addChild(self._line);
        };
        MainView.prototype.clickStart = function (e) {
            this._start.x = e.stageX;
            this._start.y = e.stageY;
            // this.drawLine();
            this.testRect2Line();
        };
        MainView.prototype.clickEnd = function (e) {
            this._end.x = e.stageX;
            this._end.y = e.stageY;
            // this.drawLine();
            this.testRect2Line();
        };
        MainView.prototype.clickCircle = function (e) {
            this._circle.x = e.stageX;
            this._circle.y = e.stageY;
        };
        MainView.prototype.clickRect = function (e) {
            this._rect.x = e.stageX;
            this._rect.y = e.stageY;
        };
        MainView.prototype.testRect2Line = function () {
            this._line.graphics.clear();
            this._line.graphics.lineStyle(3, 0xffffff);
            this._line.graphics.moveTo(this._start.x, this._start.y);
            this._line.graphics.lineTo(this._end.x, this._end.y);
            if (MainView.line2Rect(this._start.x, this._start.y, this._end.x, this._end.y, { x: this._rect.x, y: this._rect.y, width: this._rect.width, height: this._rect.height })) {
                console.log("collision");
                this._line.graphics.clear();
                this._line.graphics.lineStyle(3, 0xff0000);
                this._line.graphics.moveTo(this._start.x, this._start.y);
                this._line.graphics.lineTo(this._end.x, this._end.y);
            }
        };
        MainView.prototype.drawLine = function () {
            this._line.graphics.clear();
            this._line.graphics.lineStyle(3, 0xffffff);
            this._line.graphics.moveTo(this._start.x, this._start.y);
            this._line.graphics.lineTo(this._end.x, this._end.y);
            var _start = egret.getTimer();
            // for (let i = 0; i < 10000000; i++) {
            // 	MainView.line2Circle(this._start.x, this._start.y, this._end.x, this._end.y, { x: this._circle.x, y: this._circle.y, r: 200 })
            // }
            for (var i = 0; i < 10000000; i++) {
                MainView.lineCircleHitTest({ x: this._start.x, y: this._start.y }, { x: this._end.x, y: this._end.y }, { x: this._circle.x, y: this._circle.y }, 200);
            }
            var _sta = egret.getTimer();
            console.log(_sta - _start);
            // console.log(egret.getTimer() - _sta);
            console.log("===========");
            // if (MainView.lineCircleHitTest({ x: this._start.x, y: this._start.y }, { x: this._end.x, y: this._end.y }, { x: this._circle.x, y: this._circle.y }, 200))
            // 	console.log("collision");
            // if (MainView.line2Circle(this._start.x, this._start.y, this._end.x, this._end.y, { x: this._circle.x, y: this._circle.y, r: 200 }))
        };
        /** 线段与圆的碰撞检测 */
        MainView.line2Circle = function (p1x, p1y, p2x, p2y, circle) {
            var flag1 = (p1x - circle.x) * (p1x - circle.x) + (p1y - circle.y) * (p1y - circle.y);
            var flag2 = (p2x - circle.x) * (p2x - circle.x) + (p2y - circle.y) * (p2y - circle.y);
            if (flag1 <= circle.r * circle.r || flag2 <= circle.r * circle.r) {
                return 1;
            }
            if (p1x - p2x != 0) {
                var a = p1y - p2y;
                var b = p2x - p1x;
                var c = p1x * p2y - p2x * p1y;
                var dis1 = a * circle.x + b * circle.y + c;
                dis1 *= dis1;
                var dis2 = (a * a + b * b) * circle.r * circle.r;
                if (dis1 < dis2) {
                    var angle1 = (circle.x - p1x) * (p2x - p1x) + (circle.y - p1y) * (p2y - p1y);
                    var angle2 = (circle.x - p2x) * (p1x - p2x) + (circle.y - p2y) * (p1y - p2y);
                    // console.log("angle1:", angle1, "angle2:", angle2);
                    if (angle1 > 0 && angle2 > 0)
                        return 1;
                }
            }
            return 0;
        };
        MainView.line2Rect = function (p1x, p1y, p2x, p2y, rect) {
            var p1 = { x: p1x, y: p1y };
            var p2 = { x: p2x, y: p2y };
            var lefttop = { x: rect.x, y: rect.y }, righttop = { x: rect.x + rect.width, y: rect.y }, leftBottom = { x: rect.x, y: rect.y + rect.height }, rightbottom = { x: righttop.x, y: leftBottom.y };
            if (MainView.rectContains(rect, p1x, p1y) && MainView.rectContains(rect, p2x, p2y)) {
                return true;
            }
            if (MainView.line2line(p1, p2, lefttop, righttop)) {
                return true;
            }
            if (MainView.line2line(p1, p2, leftBottom, lefttop)) {
                return true;
            }
            if (MainView.line2line(p1, p2, rightbottom, righttop)) {
                return true;
            }
            if (MainView.line2line(p1, p2, leftBottom, rightbottom)) {
                return true;
            }
            return false;
        };
        MainView.line2line = function (p1, p2, c1, c2) {
            if (Math.max(p1.x, p2.x) < Math.min(c1.x, c2.x)) {
                return false;
            }
            if (Math.max(p1.y, p2.y) < Math.min(c1.y, c2.y)) {
                return false;
            }
            if (Math.max(c1.x, c2.x) < Math.min(p1.x, p2.x)) {
                return false;
            }
            if (Math.max(c1.y, c2.y) < Math.min(p1.y, p2.y)) {
                return false;
            }
            if (MainView.mult(c1, p2, p1) * MainView.mult(p2, c2, p1) < 0) {
                return false;
            }
            if (MainView.mult(p1, c2, c1) * MainView.mult(c2, p2, c1) < 0) {
                return false;
            }
            return true;
        };
        MainView.mult = function (a, b, c) {
            return (a.x - c.x) * (b.y - c.y) - (b.x - c.x) * (a.y - c.y);
        };
        /** 点与矩形区域 */
        MainView.rectContains = function (rect, x, y) {
            return rect.x <= x &&
                rect.x + rect.width >= x &&
                rect.y <= y &&
                rect.y + rect.height >= y;
        };
        /**
       * 线段和圆碰撞检测2
       */
        MainView.lineCircleHitTest = function (linePoint1, linePoint2, circlePoint, radius) {
            var dx1 = linePoint1.x - circlePoint.x;
            var dy1 = linePoint1.y - circlePoint.y;
            var len1Power2 = Math.floor(dx1 * dx1 + dy1 * dy1);
            var dx2 = linePoint2.x - circlePoint.x;
            var dy2 = linePoint2.y - circlePoint.y;
            var len2Power2 = Math.floor(dx2 * dx2 + dy2 * dy2);
            var radiusPower2 = radius * radius;
            // 有一点在圆内则相交
            if (len1Power2 < radiusPower2 || len2Power2 < radiusPower2)
                return true;
            // 两点在圆外：判断圆心到直线的垂直距离小于半径 && 投影到线段上的点在线段内
            var dis = this.disPointToLine(circlePoint, linePoint1, linePoint2);
            if (dis < radius) {
                var dxLine = linePoint1.x - linePoint2.x;
                var dyLine = linePoint1.y - linePoint2.y;
                var lenPower2 = Math.floor(dxLine * dxLine + dyLine * dyLine); // 线段距离平方
                var maxLen = Math.max(len1Power2, len2Power2);
                if (lenPower2 > maxLen - dis * dis)
                    return true;
            }
            return false;
        };
        /**
         * 点到直线距离公式
         */
        MainView.disPointToLine = function (p, linePoint1, linePoint2) {
            var a = linePoint2.y - linePoint1.y;
            var b = linePoint1.x - linePoint2.x;
            var c = linePoint2.x * linePoint1.y - linePoint1.x * linePoint2.y;
            var d = Math.abs(a * p.x + b * p.y + c) / Math.sqrt(a * a + b * b);
            return Math.floor(d);
        };
        return MainView;
    }(MyComponent));
    Collision.MainView = MainView;
    __reflect(MainView.prototype, "Collision.MainView");
})(Collision || (Collision = {}));
//# sourceMappingURL=MainView.js.map