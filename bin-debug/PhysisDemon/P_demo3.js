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
     * 平面小车模型
     */
    var P_demo3 = (function (_super) {
        __extends(P_demo3, _super);
        function P_demo3() {
            var _this = _super.call(this) || this;
            _this.stageHeight = egret.lifecycle.stage.stageHeight;
            _this.initScreen();
            return _this;
        }
        P_demo3.prototype.initScreen = function () {
            this.createWorld();
            // this.createGround();
            this.createCar();
            this.createDebug();
            document.addEventListener("keydown", this.keyDown);
            egret.lifecycle.stage.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        };
        P_demo3.prototype.createWorld = function () {
            this.world = new p2.World();
            this.world.sleepMode = p2.World.BODY_SLEEPING;
            this.world.gravity = [0, 0];
        };
        P_demo3.prototype.createGround = function () {
            var shape = new p2.Plane();
            var body = new p2.Body();
            // body.position[1] = this.stageHeight - 100;
            body.position[0] = egret.lifecycle.stage.stageWidth - 600;
            body.angle = -Math.PI / 2;
            // body.angle = Math.PI;
            body.addShape(shape);
            this.world.addBody(body);
        };
        P_demo3.prototype.createCar = function () {
            var self = this;
            var body = new p2.Body({ mass: 1, position: [160, 450] });
            var shape = new p2.Box({ width: 120, height: 300 });
            body.addShape(shape);
            this.world.addBody(body);
            var vehicle = new p2.TopDownVehicle(body);
            // Add one front wheel and one back wheel - we don't actually need four :)
            // this.phyLFWheel = vehicle.addWheel({
            // 	localPosition: [60, 150], // front
            // 	sideFriction: 4
            // });
            // this.phyLFWheel.collideConnected = false;
            // // Back wheel
            // this.phyLBWheel = vehicle.addWheel({
            // 	localPosition: [0, -0.5], // back
            // 	sideFriction: 3
            // });
            vehicle.addToWorld(this.world);
            // // Steer value zero means straight forward. Positive is left and negative right.
            // this.phyLFWheel.steerValue = Math.PI / 16;
            // // Engine force forward
            // this.phyLBWheel.engineForce = 10;
        };
        P_demo3.prototype.createDebug = function () {
            //创建调试试图
            this.debugDraw = new p2DebugDraw(this.world);
            var sprite = new egret.Sprite();
            this.displayListContainer.addChild(sprite);
            this.debugDraw.setSprite(sprite);
        };
        P_demo3.prototype.loop = function () {
            if (!this._time)
                this._time = egret.getTimer();
            var now = egret.getTimer();
            var passtime = now - this._time;
            this._time = now;
            this.world.step(passtime / 1000);
            this.debugDraw.drawDebug();
        };
        P_demo3.prototype.keyDown = function (e) {
            // Key controls
            var keys = {
                '37': 0,
                '39': 0,
                '38': 0,
                '40': 0 // down
            };
            var maxSteer = Math.PI / 3;
            // 	// Steer value zero means straight forward. Positive is left and negative right.
            // 	frontWheel.steerValue = maxSteer * (keys[37] - keys[39]);
            // 	// Engine force forward
            // 	backWheel.engineForce = keys[38] * 7;
            // 	backWheel.setBrakeForce(0);
            // 	if (keys[40]) {
            // 		if (backWheel.getSpeed() > 0.1) {
            // 			// Moving forward - add some brake force to slow down
            // 			backWheel.setBrakeForce(5);
            // 		} else {
            // 			// Moving backwards - reverse the engine force
            // 			backWheel.setBrakeForce(0);
            // 			backWheel.engineForce = -2;
            // 		}
            // 	}
            // }
        };
        return P_demo3;
    }(MyComponent));
    PhysicsDemo.P_demo3 = P_demo3;
    __reflect(P_demo3.prototype, "PhysicsDemo.P_demo3");
})(PhysicsDemo || (PhysicsDemo = {}));
//# sourceMappingURL=P_demo3.js.map