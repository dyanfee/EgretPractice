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
    var P_demo6 = (function (_super) {
        __extends(P_demo6, _super);
        function P_demo6() {
            var _this = _super.call(this) || this;
            //物理世界转换系数
            _this.factor = 50;
            _this.stageWidth = egret.lifecycle.stage.stageWidth;
            _this.stageHeight = egret.lifecycle.stage.stageHeight;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
            return _this;
        }
        P_demo6.prototype.onAdded2stage = function (e) {
            this.setup();
        };
        //setup
        P_demo6.prototype.setup = function () {
            //初始化P2Space
            this.worldRect = new egret.Rectangle(0, 0, this.stageWidth, this.stageHeight);
            //创建world
            this.world = new p2.World();
            //set p2.world.sleepMode
            this.world.sleepMode = p2.World.BODY_SLEEPING;
            // egret.Ticker.getInstance().register(this.p2RunStep, this);//register update step of p2.wolrd 
            egret.lifecycle.stage.addEventListener(egret.Event.ENTER_FRAME, this.p2RunStep, this);
            //p2 scene setup----------------------
            this.createSceneObjs();
            this.createDebug();
        };
        /**
         * 创建场景物体
         */
        P_demo6.prototype.createSceneObjs = function () {
            this.box1 = this.addOneBox(this.world, this.displayListContainer, 400, 100, 50, 50, 0, p2.Body.DYNAMIC); //box1
            this.box2 = this.addOneBox(this.world, this.displayListContainer, 600, 100, 50, 50, 0, p2.Body.DYNAMIC); //box2
            this.addOneBox(this.world, this.displayListContainer, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
            this.addOneBox(this.world, this.displayListContainer, 720, 240, 10, 480, 0, p2.Body.STATIC); //right wall
            this.addOneBox(this.world, this.displayListContainer, 150, 400, 800, 20, 0, p2.Body.STATIC); //bottom wall
            this.addOneBox(this.world, this.displayListContainer, 540, 365, 20, 50, 0, p2.Body.STATIC); //bottom wall
            //约束点放在两个刚体中间位置,转换到p2空间点坐标
            var pivotP2X = this.convertEgretValueToP2(450);
            var pivotP2Y = this.convertEgretY_To_P2Y(100);
            //构造方法中type的值可以是Constraint.DISTANCE, Constraint.GEAR, Constraint.LOCK, Constraint.PRISMATIC or Constraint.REVOLUTE
            //this.pvtJt = new p2.RevoluteConstraint(this.box1, this.box2,p2.Constraint.REVOLUTE, {worldPivot: [pivotP2X, pivotP2Y]});
            this.pvtJt = new p2.RevoluteConstraint(this.box1, this.box2, { worldPivot: [pivotP2X, pivotP2Y] }); //2015/10/14 新构造方法中变化                   
            this.world.addConstraint(this.pvtJt);
        };
        //update step	
        P_demo6.prototype.p2RunStep = function () {
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
            this.world.step(passtime / 1000); //p2.World.step                                 
            this.updateWorldBodiesSkin(this.world); //更新p2World内所有刚体皮肤显示
            this.debugDraw.drawDebug();
        };
        P_demo6.prototype.createDebug = function () {
            //创建调试试图
            this.debugDraw = new p2DebugDraw(this.world);
            var sprite = new egret.Sprite();
            this.displayListContainer.addChild(sprite);
            this.debugDraw.setSprite(sprite);
        };
        /**
         * 更新p2.World里面所有刚体的皮肤
         */
        P_demo6.prototype.updateWorldBodiesSkin = function (p2World) {
            var stageHeight = egret.MainContext.instance.stage.stageHeight; //显示世界 stageHeight
            var len = p2World.bodies.length;
            for (var i = 0; i < len; i++) {
                var temBody = p2World.bodies[i];
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
        P_demo6.prototype.updateBodySkin = function (body) {
            var skinDisp = body.displays[0];
            if (skinDisp) {
                skinDisp.x = this.convertP2ValueToEgret(body.position[0]); //把物理世界的位置转换到显示世界的位置，赋值
                skinDisp.y = this.convertP2Y_To_EgretY(body.position[1]); //把物理世界的位置转换到显示世界的位置，赋值
                skinDisp.rotation = this.convertP2BodyAngleToEgret(body); //把物理世界刚体角度转换为显示世界角度，赋值
            }
        };
        /**
        * 获得p2Body的egret显示旋转角度
        */
        P_demo6.prototype.convertP2BodyAngleToEgret = function (body) {
            var result;
            result = 360 - body.angle * 180 / Math.PI;
            return result;
        };
        /**
        * 把egret角度转换为p2角度
        */
        P_demo6.prototype.convertEgretAngleToP2 = function (angle) {
            var result;
            result = (360 - angle) * Math.PI / 180;
            return result;
        };
        /**
        * 物理世界的长度标量到显示世界的转换
        * 适合如 x,width,height的转换，y值不适合
        */
        P_demo6.prototype.convertP2ValueToEgret = function (value) {
            return value * this.factor;
        };
        /**
        * 显示世界物理世界的长度标量到物理世界的转换
        * 适合如 x,width,height的转换，y值不适合
        */
        P_demo6.prototype.convertEgretValueToP2 = function (value) {
            return value / this.factor;
        };
        /**
        * 把egretY值转换到p2Y值，仅适合y转换
        */
        P_demo6.prototype.convertEgretY_To_P2Y = function (egretY) {
            return (this.worldRect.height - egretY) / this.factor;
        };
        /**
        * 把p2y值转换到egretY值，仅适合y转换
        */
        P_demo6.prototype.convertP2Y_To_EgretY = function (p2Y) {
            return this.worldRect.height - p2Y * this.factor;
        };
        /**
        * 在物理世界创建一个矩形刚体，显示cube矢量图形
        */
        P_demo6.prototype.addOneBox = function (p2World, ctn, px, py, pw, ph, pAngle, type) {
            //在物理世界中的位置
            var p2x = this.convertEgretValueToP2(px); //显示位置变换到物理世界位置
            var p2y = this.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
            var p2Wid = this.convertEgretValueToP2(pw);
            var p2Hei = this.convertEgretValueToP2(ph);
            var p2Angle = this.convertEgretAngleToP2(pAngle);
            var display;
            var bodyShape = new p2.Box({ width: p2Wid, height: p2Hei });
            var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
            body.type = type;
            body.addShape(bodyShape); //给刚体添加p2.Shape
            p2World.addBody(body);
            display = this.createBoxSkin(pw, ph);
            //绑定刚体和显示皮肤
            body.displays = [display];
            ctn.addChild(display); //把皮肤添加到显示世界
            return body;
        };
        /**
        * 创建一个方形皮肤
        * 返回的图形锚点位于图形中心
        */
        P_demo6.prototype.createBoxSkin = function (width, height) {
            console.log("createBoxSkin " + width + "," + height);
            var shape = new egret.Shape();
            shape.graphics.lineStyle(1, 0);
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawRect(0, 0, width, height);
            shape.graphics.endFill();
            //将显示对象的锚点移到中心位置
            shape.anchorOffsetX = shape.width / 2;
            shape.anchorOffsetY = shape.height / 2;
            return shape;
        };
        return P_demo6;
    }(MyComponent));
    PhysicsDemo.P_demo6 = P_demo6;
    __reflect(P_demo6.prototype, "PhysicsDemo.P_demo6");
})(PhysicsDemo || (PhysicsDemo = {}));
//# sourceMappingURL=P_demo6.js.map