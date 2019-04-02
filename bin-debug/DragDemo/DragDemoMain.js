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
var DragPro;
(function (DragPro) {
    var DragDemoMain = (function (_super) {
        __extends(DragDemoMain, _super);
        function DragDemoMain() {
            var _this = _super.call(this) || this;
            // 抛物线计算参数
            _this.g = 900;
            _this.angle = 0;
            // 第二种抛物线
            _this.gr = 0.2;
            _this.minSpeed = 5;
            _this.maxPower = 14;
            // 起点与终点最大距离
            _this.MAX_DISTANCE = 200;
            _this._drawCrew = 20;
            // 最大速度
            _this.MAX_INCREASE_SPEED = 700;
            // 最小速度
            _this.miniSpeed = 300;
            // 绘制距离
            _this.DRAW_DISTANCE = 15;
            // 绘制点列表
            _this._pointList = [];
            _this.scaleRate = 5;
            // bezier 曲线点
            _this.P0 = new egret.Point(0, 350);
            _this.P1XLimit = 100;
            _this.P2XLimit = 300;
            return _this;
        }
        DragDemoMain.prototype.myload = function () {
            this.myinit();
            this.addListen();
        };
        DragDemoMain.prototype.myinit = function () {
            this._initPoint = new egret.Point();
            this._lastPoint = new egret.Point();
        };
        DragDemoMain.prototype.addListen = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touch, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touch, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.touch, this);
        };
        DragDemoMain.prototype.beginDrag = function (initpoint) {
            this._radian = 0;
            this._initPoint = initpoint;
        };
        DragDemoMain.prototype.touch = function (evt) {
            // console.log(evt.type);
            switch (evt.type) {
                case "touchBegin":
                    this._initPoint.x = evt.stageX;
                    this._initPoint.y = evt.stageY;
                    this._time = egret.getTimer();
                    break;
                case "touchMove":
                    this._lastPoint.x = evt.stageX;
                    this._lastPoint.y = evt.stageY;
                    this.testDrawPowerLine(this._initPoint, this._lastPoint);
                    if (egret.getTimer() - this._time < 50)
                        return;
                    this._time = egret.getTimer();
                    if (this._pointList)
                        this.releasePointList();
                    // this.testDrawParabola();
                    this.bezierParabola();
                    // this.testParabola(this._initPoint, this._lastPoint);
                    // this.test(this._initPoint, this._lastPoint);
                    break;
                case "touchEnd":
                    // 清除线条
                    if (this._powerLine)
                        this._powerLine.graphics.clear();
                    // 清除点列表
                    // if (this._pointList) this.releasePointList();
                    // 绘制曲线
                    // this.testDrawBezier(this._initPoint, new egret.Point(this._initPoint.x + 100, this._initPoint.y - 100), this._lastPoint);
                    break;
            }
        };
        // 第二种计算抛物线方案 X = Vx * t   Y = (Vy-g)*t
        DragDemoMain.prototype.testParabola = function (beginPoint, endPoint) {
            // 计算角度和蓄力程度
            // let len = Math.sqrt(Math.pow((endPoint.x - beginPoint.x), 2) + Math.pow((endPoint.y - beginPoint.y), 2));
            var len = egret.Point.distance(beginPoint, endPoint);
            // len = Math.floor(len * 100) / 100;
            var radian = Math.atan2((endPoint.y - beginPoint.y), (endPoint.x - beginPoint.x));
            // radian = Math.floor(radian * 100) / 100;
            console.log(len, radian);
            this.powerRate = len / this.MAX_DISTANCE;
            var speed = 19;
            // console.log(speed);
            this._speedX = 18;
            // this._speedX = Math
            this._speedY = Math.sin(-radian) * speed;
            var r = Math.abs(radian);
            if (r >= Math.PI / 2 && r <= Math.PI * 0.75) {
                this._speedX *= (Math.cos(radian) * Math.cos(Math.PI / 4));
            }
            if (radian <= Math.PI / 2 && radian >= -Math.PI / 2) {
                this._speedX = 0.1;
                this._speedY = Math.sin(-radian) > 0 ? 19 : -19;
            }
            this._speedX = this._speedX < 0 ? -this._speedX : this._speedX;
            // if (!this._speedX) this._speedX = 0;
            // if (!this._speedY) this._speedY = 0;
            // console.log(this._speedX, this._speedY);
            var t0 = this.width / this._speedX;
            this._totalTime = t0 > 150 ? 150 : t0;
            // console.log(this.width, this._totalTime, this._speedX);
            var y = 350, x = 0;
            var t = 0;
            while (t < this._totalTime) {
                t += 1;
                var item = ComPools.instance.getCom("Point").asCom;
                item.x = (x += this._speedX);
                item.y = (y += (this._speedY += this.gr));
                this.addChild(item);
                this._pointList.push(item);
            }
        };
        // 第二种计算抛物线方案 X = Vx * t   Y = (Vy-g)*t
        DragDemoMain.prototype.test = function (beginPoint, endPoint) {
            // 计算角度和蓄力程度
            var len = egret.Point.distance(beginPoint, endPoint);
            var radian = Math.atan2((endPoint.y - beginPoint.y), (endPoint.x - beginPoint.x));
            this.powerRate = len / this.MAX_DISTANCE;
            var speed = 18;
            this._speedX = Math.cos(radian) * speed;
            this._speedY = Math.sin(-radian) * speed;
            // let r = Math.abs(radian);
            // if (r >= Math.PI / 2 && r <= Math.PI * 0.75) {
            // 	this._speedX *= (Math.cos(radian) * Math.cos(Math.PI / 4));
            // }
            if (radian <= Math.PI / 2 && radian >= -Math.PI / 2) {
                this._speedX = 0;
                this._speedY = Math.sin(-radian) > 0 ? 19 : -19;
            }
            this._speedX = this._speedX < 0 ? -this._speedX : this._speedX;
            var t0 = this.width / this._speedX;
            this._totalTime = t0 > 150 ? 150 : t0;
            var y = 350, x = 0;
            var t = 0;
            var scale = 1;
            while (t < this._totalTime) {
                t += 1;
                var item = ComPools.instance.getCom("Point").asCom;
                item.x = (x += this._speedX * scale);
                item.y = (y += (this._speedY += this.gr) * scale);
                this.addChild(item);
                this._pointList.push(item);
            }
        };
        /**
         * 		绘制抛物线
         *
         */
        DragDemoMain.prototype.testDrawParabola = function () {
            var distance = egret.Point.distance(this._initPoint, this._lastPoint);
            // distance = distance > this.MAX_DISTANCE ? this.MAX_DISTANCE : distance;
            this.powerRate = distance / this.MAX_DISTANCE;
            this.vSpeed = this.miniSpeed + Math.round(this.powerRate * this.MAX_INCREASE_SPEED);
            console.log(this.vSpeed);
            var y = 350, x = 0;
            var n = 100;
            var t = 0;
            while (n > 0) {
                n--;
                t += 0.02;
                x += this.DRAW_DISTANCE;
                // y = x * Math.tan(this.angle) - this.g * x * x / (2 * Math.pow(this.vSpeed * Math.cos(this.angle), 2));
                // y = this.vSpeed * t * Math.sin(this.angle) - 500 * t * t / 2 + 350;
                // let angle = 
                y = -(this.vSpeed * t * Math.sin(this.angle) - (1000 * t * t) / 2) + 350;
                console.log(this.vSpeed, y, t, Math.sin(this.angle), this.angle * 180 / Math.PI);
                var item = ComPools.instance.getCom("Point").asCom;
                item.x = x;
                item.y = y;
                this.addChild(item);
                this._pointList.push(item);
            }
        };
        // release point list
        DragDemoMain.prototype.releasePointList = function () {
            if (this._pointList) {
                this._pointList.forEach(function (e) {
                    ComPools.instance.disposeCom("Point", e);
                });
                this._pointList.length = 0;
            }
        };
        // 计算抛物线数据  bezier 三个点
        DragDemoMain.prototype.bezierParabola = function () {
            var p1 = new egret.Point();
            var distance = egret.Point.distance(this._initPoint, this._lastPoint);
            distance = distance > this.MAX_DISTANCE ? this.MAX_DISTANCE : distance;
            var x1 = -distance * Math.cos(this.angle) * this.scaleRate;
            x1 = x1 < this.P1XLimit ? this.P1XLimit : x1;
            var y1 = -distance * Math.sin(this.angle) * this.scaleRate * 2 + this.P0.y;
            y1 = y1 > this.P0.y ? this.P0.y : y1;
            this.P1 = egret.Point.create(x1, y1);
            this.drawTestPoint1(x1, y1);
            // console.log(Math.sin(this.angle), x1, y1);
            var x2 = -distance * Math.cos(this.angle) * this.scaleRate * 5;
            x2 = x2 < this.P2XLimit ? this.P2XLimit : x2;
            var y2 = this.height;
            this.P2 = egret.Point.create(x2, y2);
            this.drawTestPoint2(x2, y2);
            // 绘制beizer曲线
            this.testDrawBezier(this.P0, this.P1, this.P2);
            egret.Point.release(this.P1);
            egret.Point.release(this.P2);
        };
        // 绘制测试点P1
        DragDemoMain.prototype.drawTestPoint1 = function (x, y) {
            (!this._testPoint1) && (this._testPoint1 = new egret.Shape());
            this._testPoint1.graphics.clear();
            this._testPoint1.graphics.beginFill(0xdf001f);
            this._testPoint1.graphics.drawCircle(x, y, 5);
            this._testPoint1.graphics.endFill();
            this.displayListContainer.addChild(this._testPoint1);
        };
        // 绘制测试点P2
        DragDemoMain.prototype.drawTestPoint2 = function (x, y) {
            (!this._testPoint2) && (this._testPoint2 = new egret.Shape());
            this._testPoint2.graphics.clear();
            this._testPoint2.graphics.beginFill(0x5fb336);
            this._testPoint2.graphics.drawCircle(x, y, 5);
            this._testPoint2.graphics.endFill();
            this.displayListContainer.addChild(this._testPoint2);
        };
        /**
         * Bezier 曲线
         * 公式 B = ( 1 - t )^2 * P0 + 2 * t * ( 1 - t ) P1 + t^2 * P2
        */
        DragDemoMain.prototype.testDrawBezier = function (beginPoint, powerPoint, endPoint) {
            if (this._bezierLine)
                this._bezierLine.graphics.clear();
            var line = new egret.Shape();
            line.graphics.lineStyle(4, 0x87CEFA, 1, false, "normal", null, null, 3, [10, 10]);
            line.graphics.moveTo(beginPoint.x, beginPoint.y);
            line.graphics.curveTo(powerPoint.x, powerPoint.y, endPoint.x, endPoint.y);
            line.graphics.endFill();
            this.displayListContainer.addChild(line);
            this._bezierLine = line;
        };
        //  绘制拉力线
        DragDemoMain.prototype.testDrawPowerLine = function (beginPoint, endPoint) {
            if (!this._powerLine)
                this._powerLine = new egret.Shape();
            var distance = egret.Point.distance(beginPoint, endPoint);
            // 计算最长距离 并限制
            endPoint = distance > this.MAX_DISTANCE ? egret.Point.interpolate(beginPoint, endPoint, 1 - this.MAX_DISTANCE / distance) : endPoint;
            this._lastPoint = endPoint;
            // console.log(egret.Point.distance(beginPoint, endPoint));
            this._powerLine.graphics.clear();
            this._powerLine.graphics.lineStyle(2, 0x33ff33);
            this._powerLine.graphics.moveTo(beginPoint.x, beginPoint.y);
            this._powerLine.graphics.lineTo(endPoint.x, endPoint.y);
            this._powerLine.graphics.endFill();
            this.displayListContainer.addChild(this._powerLine);
            // 计算角度 弧度转角度
            var angle = Math.atan2(endPoint.y - beginPoint.y, endPoint.x - beginPoint.x);
            this.angle = angle;
            // console.log("calcAngle:", angle);
        };
        return DragDemoMain;
    }(MyComponent));
    DragPro.DragDemoMain = DragDemoMain;
    __reflect(DragDemoMain.prototype, "DragPro.DragDemoMain");
})(DragPro || (DragPro = {}));
//# sourceMappingURL=DragDemoMain.js.map