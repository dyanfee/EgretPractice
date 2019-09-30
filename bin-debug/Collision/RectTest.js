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
    var RectTest = (function (_super) {
        __extends(RectTest, _super);
        function RectTest() {
            var _this = _super.call(this) || this;
            _this._rotStep = 1;
            _this._moveStep = 4;
            return _this;
        }
        RectTest.prototype.myload = function () {
            this._rect1 = this.getChild("rect1").asCom;
            this._rect2 = this.getChild("rect2").asCom;
            this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
            var p = {};
            p.point = {};
            p.point.x = 1;
            p.point.y = 2;
            p.width = 3;
            p.height = 4;
            console.log(p);
        };
        /**
         * 带角度的两个矩形包围检测
         * rect1  大的矩形
         * rect2  小的矩形
         */
        RectTest.prototype.checkCollision = function (rect1, rect2) {
            var p = this.getRectPos(rect1);
            var q = this.getRectPos(rect2);
            this.drawShape(q[0], q[1], q[2], q[3]);
            return this.isPointInRect(p[0], p[1], p[2], p[3], q[0]) &&
                this.isPointInRect(p[0], p[1], p[2], p[3], q[1]) &&
                this.isPointInRect(p[0], p[1], p[2], p[3], q[2]) &&
                this.isPointInRect(p[0], p[1], p[2], p[3], q[3]);
        };
        RectTest.prototype.getRectPos = function (rect) {
            var p1 = [-rect.width * 0.5, -rect.height * 0.5];
            var p2 = [rect.width * 0.5, -rect.height * 0.5];
            var p3 = [rect.width * 0.5, rect.height * 0.5];
            var p4 = [-rect.width * 0.5, rect.height * 0.5];
            p1 = this.transPoint2(p1, rect);
            p2 = this.transPoint2(p2, rect);
            p3 = this.transPoint2(p3, rect);
            p4 = this.transPoint2(p4, rect);
            var pos = [p1, p2, p3, p4];
            return pos;
        };
        RectTest.prototype.transPoint2 = function (p, rect) {
            var angle = rect.rotation * Math.PI / 180;
            var x1 = p[0] * Math.cos(angle) - p[1] * Math.sin(angle) + rect.x;
            var y1 = p[0] * Math.sin(angle) + p[1] * Math.cos(angle) + rect.y;
            return [x1, y1];
        };
        RectTest.prototype.mult = function (p1, p2, p) {
            return (p2[0] - p1[0]) * (p[1] - p1[1]) - (p[0] - p1[0]) * (p2[1] - p1[1]);
        };
        RectTest.prototype.isPointInRect = function (p1, p2, p3, p4, p) {
            return this.mult(p1, p2, p) * this.mult(p3, p4, p) >= 0 && this.mult(p4, p1, p) * this.mult(p2, p3, p) >= 0;
        };
        RectTest.prototype.transPoint = function (p, x, y, rotation) {
            var angle = rotation * Math.PI / 180;
            var x1 = (p[0] - x) * Math.cos(angle) - (p[1] - y) * Math.sin(angle) + x;
            var y1 = (p[0] - x) * Math.sin(angle) + (p[1] - y) * Math.cos(angle) + y;
            return [x1, y1];
        };
        RectTest.prototype.drawShape = function (p1, p2, p3, p4) {
            if (!this._rectShap) {
                this._rectShap = new egret.Shape();
                this.displayListContainer.addChild(this._rectShap);
            }
            this._rectShap.graphics.clear();
            this._rectShap.graphics.lineStyle(3, 0x0000ff);
            this._rectShap.graphics.moveTo(p1[0], p1[1]);
            this._rectShap.graphics.lineTo(p2[0], p2[1]);
            this._rectShap.graphics.lineTo(p3[0], p3[1]);
            this._rectShap.graphics.lineTo(p4[0], p4[1]);
            this._rectShap.graphics.lineTo(p1[0], p1[1]);
        };
        RectTest.prototype.onFrame = function () {
            if (KeyBoardMgr.isDown(KeyBoardMgr.W)) {
                this._rect2.x += Math.sin((this._rect2.rotation) / 180 * Math.PI) * this._moveStep;
                this._rect2.y -= Math.cos((this._rect2.rotation) / 180 * Math.PI) * this._moveStep;
            }
            if (KeyBoardMgr.isDown(KeyBoardMgr.S)) {
                this._rect2.x -= Math.sin((this._rect2.rotation) / 180 * Math.PI) * this._moveStep;
                this._rect2.y += Math.cos((this._rect2.rotation) / 180 * Math.PI) * this._moveStep;
            }
            if (KeyBoardMgr.isDown(KeyBoardMgr.A)) {
                this._rect2.rotation -= this._rotStep;
            }
            if (KeyBoardMgr.isDown(KeyBoardMgr.D)) {
                this._rect2.rotation += this._rotStep;
            }
            if (KeyBoardMgr.isDown(KeyBoardMgr.UP)) {
                this._rect1.x += Math.sin((this._rect1.rotation) / 180 * Math.PI) * this._moveStep;
                this._rect1.y -= Math.cos((this._rect1.rotation) / 180 * Math.PI) * this._moveStep;
            }
            if (KeyBoardMgr.isDown(KeyBoardMgr.DOWN)) {
                this._rect1.x -= Math.sin((this._rect1.rotation) / 180 * Math.PI) * this._moveStep;
                this._rect1.y += Math.cos((this._rect1.rotation) / 180 * Math.PI) * this._moveStep;
            }
            if (KeyBoardMgr.isDown(KeyBoardMgr.LEFT)) {
                this._rect1.rotation -= this._rotStep;
            }
            if (KeyBoardMgr.isDown(KeyBoardMgr.RIGHT)) {
                this._rect1.rotation += this._rotStep;
            }
            this.checkCollision(this._rect1, this._rect2);
        };
        return RectTest;
    }(MyComponent));
    Collision.RectTest = RectTest;
    __reflect(RectTest.prototype, "Collision.RectTest");
})(Collision || (Collision = {}));
//# sourceMappingURL=RectTest.js.map