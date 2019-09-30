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
     * 等比例物理世界demo
     */
    var P_demo1 = (function (_super) {
        __extends(P_demo1, _super);
        function P_demo1() {
            var _this = _super.call(this) || this;
            _this.stageHeight = egret.lifecycle.stage.stageHeight;
            _this.types = ["box", "circle", "capsule", "line", "particle"];
            _this.initScreen();
            return _this;
        }
        P_demo1.prototype.initScreen = function () {
            this.createWorld();
            this.createGround();
            this.createBodies();
            this.createDebug();
            egret.lifecycle.stage.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
            //鼠标点击添加刚体
            egret.lifecycle.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
        };
        P_demo1.prototype.createWorld = function () {
            this.world = new p2.World();
            this.world.sleepMode = p2.World.BODY_SLEEPING;
            this.world.gravity = [-100, 0];
        };
        P_demo1.prototype.createGround = function () {
            var shape = new p2.Plane();
            var body = new p2.Body();
            // body.position[1] = this.stageHeight - 100;
            body.position[0] = egret.lifecycle.stage.stageWidth - 600;
            body.angle = -Math.PI / 2;
            // body.angle = Math.PI;
            body.addShape(shape);
            this.world.addBody(body);
        };
        P_demo1.prototype.createBodies = function () {
            var box = new p2.Box({ width: 100, height: 50 });
            var boxBody = new p2.Body({
                mass: 1,
                position: [200, 200],
                angularVelocity: 1
            });
            boxBody.addShape(box);
            this.world.addBody(boxBody);
            var boxShape = new p2.Box({ width: 50, height: 50 });
            var boxBody2 = new p2.Body({ mass: 1, position: [200, 380], angularVelocity: 1 });
            boxBody2.addShape(boxShape);
            this.world.addBody(boxBody2);
        };
        P_demo1.prototype.createDebug = function () {
            //创建调试试图
            this.debugDraw = new p2DebugDraw(this.world);
            var sprite = new egret.Sprite();
            this.displayListContainer.addChild(sprite);
            this.debugDraw.setSprite(sprite);
        };
        P_demo1.prototype.loop = function () {
            if (!this._time)
                this._time = egret.getTimer();
            var now = egret.getTimer();
            var passtime = now - this._time;
            this._time = now;
            this.world.step(passtime / 1000);
            this.debugDraw.drawDebug();
        };
        P_demo1.prototype.addOneBox = function (e) {
            // let shape: egret.Shape = new egret.Shape();
            // shape.graphics.beginFill(0xff0000);
            // shape.graphics.drawRect(0, 0, 100, 100);
            // shape.graphics.endFill();
            // shape.x = shape.y = 300;
            // this.displayListContainer.addChild(shape);
            var positionX = Math.floor(e.stageX);
            var positionY = Math.floor(e.stageY);
            var shape;
            var body = new p2.Body({ gravityScale: 10, mass: 1, position: [positionX, positionY] });
            body.sleep;
            var shapeType = this.types[Math.floor((Math.random() * this.types.length))];
            //shapeType = "particle";
            shapeType = "box";
            switch (shapeType) {
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
            this.world.addBody(body);
        };
        return P_demo1;
    }(MyComponent));
    PhysicsDemo.P_demo1 = P_demo1;
    __reflect(P_demo1.prototype, "PhysicsDemo.P_demo1");
})(PhysicsDemo || (PhysicsDemo = {}));
//# sourceMappingURL=P_demo1.js.map