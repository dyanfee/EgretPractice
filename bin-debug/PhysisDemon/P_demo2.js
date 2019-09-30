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
     * 转换为物理世界单位--米
     */
    var P_demo2 = (function (_super) {
        __extends(P_demo2, _super);
        function P_demo2() {
            var _this = _super.call(this) || this;
            _this.stageHeight = egret.lifecycle.stage.stageHeight;
            _this.factor = 30;
            _this.initScreen();
            return _this;
        }
        P_demo2.prototype.initScreen = function () {
            this.createWorld();
            this.createGround();
            // this.createBodies();
            this.createDebug();
            egret.lifecycle.stage.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
            //鼠标点击添加刚体
            egret.lifecycle.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
        };
        P_demo2.prototype.createWorld = function () {
            this.world = new p2.World();
            this.world.sleepMode = p2.World.BODY_SLEEPING;
            // this.world.gravity = [0, 0];
        };
        P_demo2.prototype.createGround = function () {
            var shape = new p2.Plane();
            var body = new p2.Body();
            // body.position[1] = 100;
            body.addShape(shape);
            this.world.addBody(body);
        };
        P_demo2.prototype.createBodies = function () {
            var rect = this.createObject("phyRect").asCom;
            rect.setPivot(0.5, 0.5, true);
            var box = new p2.Box({ width: rect.width / this.factor, height: rect.height / this.factor });
            var boxBody = new p2.Body({
                mass: 1,
                position: [300 / this.factor, (egret.MainContext.instance.stage.stageHeight - 300) / this.factor],
                angularVelocity: 1
            });
            boxBody.addShape(box);
            boxBody.displays = [rect.displayObject];
            this.world.addBody(boxBody);
            this.addChild(rect);
            // let boxShape: p2.Shape = new p2.Box({ width: 2, height: 2 });
            // let boxBody2 = new p2.Body({
            // 	mass: 1,
            // 	position: [400 / this.factor,
            // 	(egret.MainContext.instance.stage.stageHeight - 300) / this.factor],
            // 	angularVelocity: 1
            // });
            // boxBody2.addShape(boxShape);
            // this.world.addBody(boxBody2);
        };
        P_demo2.prototype.createDebug = function () {
            //创建调试试图
            this.debugDraw = new p2DebugDraw(this.world);
            var sprite = new egret.Sprite();
            this.displayListContainer.addChild(sprite);
            this.debugDraw.setSprite(sprite);
        };
        P_demo2.prototype.loop = function () {
            if (!this._time)
                this._time = egret.getTimer();
            var now = egret.getTimer();
            var passtime = now - this._time;
            this._time = now;
            this.world.step(passtime / 1000);
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var len = this.world.bodies.length;
            for (var i = 0; i < len; i++) {
                var body = this.world.bodies[i];
                var display = body["display"];
                if (display) {
                    display.x = body.position[0] * this.factor;
                    display.y = stageHeight - body.position[1] * this.factor;
                    display.rotation = 360 - (body.angle + body.shapes[0].angle) * 180 / Math.PI;
                }
            }
            this.debugDraw.drawDebug();
        };
        P_demo2.prototype.addOneBox = function (e) {
            var positionX = e.stageX / this.factor;
            var positionY = (this.stageHeight - e.stageY) / this.factor;
            var shape;
            var body = new p2.Body({ mass: 1, position: [positionX, positionY] });
            body.sleep;
            var shapeType = Math.random() > 0.5 ? "phyRect" : "phyBall";
            var display = this.createObject(shapeType);
            display.setPivot(0.5, 0.5, true);
            display.x = e.stageX;
            display.y = e.stageY;
            switch (shapeType) {
                case "phyRect":
                    shape = new p2.Box({ width: display.width / this.factor, height: display.height / this.factor });
                    break;
                case "phyBall":
                    shape = new p2.Circle({ radius: display.width * .5 / this.factor });
                    break;
                case "box":
                    //shape = new p2.Rectangle(Math.random() * 150 + 50, 100);
                    shape = new p2.Box({ width: Math.random() * 150 + 50, height: 100 });
                    break;
                case "circle":
                    //shape = new p2.Circle(50);
                    shape = new p2.Circle({ radius: 50 });
                    break;
                case "capsule":
                    //shape = new p2.Capsule(50, 10);
                    shape = new p2.Capsule({ length: 50, radius: 10 });
                    break;
                case "line":
                    //shape = new p2.Line(150);
                    shape = new p2.Line({ length: 150 });
                    break;
                case "particle":
                    shape = new p2.Particle();
                    break;
            }
            body.addShape(shape);
            body["display"] = display;
            this.world.addBody(body);
            this.addChild(display);
        };
        return P_demo2;
    }(MyComponent));
    PhysicsDemo.P_demo2 = P_demo2;
    __reflect(P_demo2.prototype, "PhysicsDemo.P_demo2");
})(PhysicsDemo || (PhysicsDemo = {}));
//# sourceMappingURL=P_demo2.js.map