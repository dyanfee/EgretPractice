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
var PhysicsDemo;
(function (PhysicsDemo) {
    /**
     * 转换数值尝试
     * 小车轮胎约束
     */
    var P_demo4 = (function (_super) {
        __extends(P_demo4, _super);
        function P_demo4() {
            var _this = _super.call(this) || this;
            _this.stageHeight = egret.lifecycle.stage.stageHeight;
            _this.initScreen();
            return _this;
        }
        P_demo4.prototype.initScreen = function () {
            this.createWorld();
            // this.createGround();
            this.createCar();
            this.createDebug();
            egret.lifecycle.stage.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
            //鼠标点击添加刚体
            egret.lifecycle.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
        };
        P_demo4.prototype.createWorld = function () {
            this.world = new p2.World();
            this.world.sleepMode = p2.World.BODY_SLEEPING;
            this.world.gravity = [0, 0];
        };
        P_demo4.prototype.createGround = function () {
            var shape = new p2.Plane();
            var body = new p2.Body();
            // body.position[1] = this.stageHeight - 100;
            body.position[0] = egret.lifecycle.stage.stageWidth - 600;
            body.angle = -Math.PI / 2;
            // body.angle = Math.PI;
            body.addShape(shape);
            this.world.addBody(body);
        };
        P_demo4.prototype.createCar = function () {
            var self = this;
            var shape;
            // 车身
            shape = new p2.Box({ width: 120, height: 300 });
            this.physBody = new p2.Body({ position: [160, 450] });
            this.physBody.addShape(shape);
            this.world.addBody(this.physBody);
            shape = new p2.Box({ width: 22, height: 57 });
            this.phyLFWheel = new p2.Body({ mass: 1, position: [11, 74] });
            this.phyLFWheel.addShape(shape);
            this.world.addBody(this.phyLFWheel);
            // shape = new p2.Box({ width: 22, height: 57 })
            // this.phyRFWheel = new p2.Body({ mass: 1, position: [113, 74] });
            // this.phyRFWheel.addShape(shape);
            // this.world.addBody(this.phyRFWheel);
            // shape = new p2.Box({ width: 22, height: 57 })
            // this.phyLBWheel = new p2.Body({ mass: 1, position: [11, 229] });
            // this.phyLBWheel.addShape(shape);
            // this.world.addBody(this.phyLBWheel);
            // shape = new p2.Box({ width: 22, height: 57 })
            // this.phyRBWheel = new p2.Body({ mass: 1, position: [113, 229] });
            // this.phyRBWheel.addShape(shape);
            // this.world.addBody(this.phyRBWheel);
            var revoluteCon1 = new p2.RevoluteConstraint(this.physBody, this.phyLFWheel, {
                localPivotA: [0, 0],
                localPivotB: [0, 0],
                collideConnected: false,
            });
            this.world.addConstraint(revoluteCon1);
            this.phyLFWheel.velocity = [100, 0];
            this.phyLFWheel.damping = 0;
        };
        P_demo4.prototype.createDebug = function () {
            //创建调试试图
            this.debugDraw = new p2DebugDraw(this.world);
            var sprite = new egret.Sprite();
            this.displayListContainer.addChild(sprite);
            this.debugDraw.setSprite(sprite);
        };
        P_demo4.prototype.loop = function () {
            if (!this._time)
                this._time = egret.getTimer();
            var now = egret.getTimer();
            var passtime = now - this._time;
            this._time = now;
            if (passtime < 10) {
                return;
            }
            if (passtime > 1000) {
                return;
            }
            this.world.step(passtime / 1000);
            this.debugDraw.drawDebug();
            console.log(this.physBody.position[0], this.physBody.position[1], this.phyLFWheel.position[0], this.phyLFWheel.position[1]);
        };
        P_demo4.prototype.addOneBox = function (e) {
        };
        return P_demo4;
    }(MyComponent));
    PhysicsDemo.P_demo4 = P_demo4;
    __reflect(P_demo4.prototype, "PhysicsDemo.P_demo4");
})(PhysicsDemo || (PhysicsDemo = {}));
//# sourceMappingURL=P_demo4.js.map