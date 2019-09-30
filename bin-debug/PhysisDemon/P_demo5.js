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
     * 小车轮胎约束
     */
    var P_demo5 = (function (_super) {
        __extends(P_demo5, _super);
        function P_demo5() {
            var _this = _super.call(this) || this;
            _this.maxSteer = Math.PI / 5;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
            return _this;
        }
        P_demo5.prototype.onAdded2stage = function (e) {
            jbP2.KeyManager.init();
            this.world = new p2.World();
            this.world.gravity = [0, 0]; //set 0 gravity
            this.world.sleepMode = p2.World.NO_SLEEPING;
            egret.Ticker.getInstance().register(this.p2RunStep, this); //register update step of p2.wolrd 
            //鼠标拾取工具实例
            // var mouseJt = new P2MouseJointHelper(this.displayListContainer.stage, this.displayListContainer, this.world);
            var tembody;
            tembody = PhysicsDemo.P2Tool.createBox(this.world, this, 0, 640, 20, 1280, 0, p2.Body.STATIC); //left wall
            tembody = PhysicsDemo.P2Tool.createBox(this.world, this, 720, 640, 20, 1280, 0, p2.Body.STATIC); //right wall    
            tembody = PhysicsDemo.P2Tool.createBox(this.world, this, 360, 0, 800, 20, 0, p2.Body.STATIC); //top static
            tembody = PhysicsDemo.P2Tool.createBox(this.world, this, 360, 1280, 720, 20, 0, p2.Body.STATIC); //bottom static
            this.chassis = PhysicsDemo.P2Tool.createBox(this.world, this, 400, 100, 40, 100, 0, p2.Body.DYNAMIC); //chassis body
            // Create the vehicle
            this.p2Vehicle = new p2.TopDownVehicle(this.chassis);
            // Add one front wheel and one back wheel - we don't actually need four :)
            this.frontWheel = this.p2Vehicle.addWheel({
                localPosition: [0, 100 / PhysicsDemo.P2Tool.factor / 2] // front
            });
            this.frontWheel["setSideFriction"](4); //p2含有的api，Egret没添加
            // Back wheel
            this.backWheel = this.p2Vehicle.addWheel({
                localPosition: [0, -100 / PhysicsDemo.P2Tool.factor / 2] // back
            });
            this.backWheel["setSideFriction"](2); // Less side friction on back wheel makes it easier to drift
            this.p2Vehicle.addToWorld(this.world);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onef, this);
        };
        //update step
        P_demo5.prototype.p2RunStep = function (dt) {
            if (dt < 10) {
                return;
            }
            if (dt > 1000) {
                return;
            }
            console.log((dt / 1000));
            this.world.step(dt / 1000); //p2.World.step                                 
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var len = this.world.bodies.length;
            for (var i = 0; i < len; i++) {
                var body = this.world.bodies[i];
                var display = body["display"];
                if (display) {
                    display.x = body.position[0] * PhysicsDemo.P2Tool.factor;
                    display.y = stageHeight - body.position[1] * PhysicsDemo.P2Tool.factor;
                    display.rotation = 360 - (body.angle + body.shapes[0].angle) * 180 / Math.PI;
                }
            }
            // this.debugDraw.drawDebug();
        };
        /**
         * 更新p2.World里面所有刚体的皮肤
         */
        P_demo5.prototype.updateWorldBodiesSkin = function (p2World) {
            var stageHeight = egret.MainContext.instance.stage.stageHeight; //显示世界 stageHeight
            var len = p2World.bodies.length;
            for (var i = 0; i < len; i++) {
                var temBody = p2World.bodies[i];
                if (!temBody)
                    return;
                this.updateBodySkin(temBody);
                var dispSkin = temBody.displays[0];
                if (dispSkin) {
                    if (temBody.sleepState == p2.Body.SLEEPING) {
                        dispSkin.alpha = 0.5;
                    }
                    else {
                        dispSkin.alpha = 1;
                    }
                } //endif
            } //end for
        };
        /**
         * 更新目标刚体的皮肤
         */
        P_demo5.prototype.updateBodySkin = function (body) {
            var skinDisp = body.displays[0];
            if (skinDisp) {
                skinDisp.x = PhysicsDemo.P2Tool.convertP2ValueToEgret(body.position[0]); //把物理世界的位置转换到显示世界的位置，赋值
                skinDisp.y = PhysicsDemo.P2Tool.convertP2Y_To_EgretY(body.position[1]); //把物理世界的位置转换到显示世界的位置，赋值
                skinDisp.rotation = PhysicsDemo.P2Tool.convertP2BodyAngleToEgret(body); //把物理世界刚体角度转换为显示世界角度，赋值
            }
        };
        P_demo5.prototype.onef = function (e) {
            this.updateKeyCtrl();
        };
        P_demo5.prototype.updateKeyCtrl = function () {
            // Steer value zero means straight forward. Positive is left and negative right.
            var steerValue = 0;
            if (jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)) {
                steerValue = 1;
            }
            else if (jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)) {
                steerValue = -1;
            }
            else {
                steerValue = 0;
            }
            this.frontWheel.steerValue = this.maxSteer * steerValue;
            // Engine force forward
            var engineForce = 0;
            if (jbP2.KeyManager.isDown(jbP2.KeyManager.UP)) {
                engineForce = 1;
            }
            else {
                engineForce = 0;
            }
            this.backWheel.engineForce = engineForce * 5;
            this.backWheel["setBrakeForce"](0);
            if (jbP2.KeyManager.isDown(jbP2.KeyManager.DOWN)) {
                if (this.backWheel.getSpeed() > 0.1) {
                    // Moving forward - add some brake force to slow down
                    this.backWheel["setBrakeForce"](5);
                }
                else {
                    // Moving backwards - reverse the engine force
                    this.backWheel["setBrakeForce"](0);
                    this.backWheel.engineForce = -2;
                }
            }
        };
        return P_demo5;
    }(MyComponent));
    PhysicsDemo.P_demo5 = P_demo5;
    __reflect(P_demo5.prototype, "PhysicsDemo.P_demo5");
})(PhysicsDemo || (PhysicsDemo = {}));
//# sourceMappingURL=P_demo5.js.map