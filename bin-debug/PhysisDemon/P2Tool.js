var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PhysicsDemo;
(function (PhysicsDemo) {
    var P2Tool = (function () {
        function P2Tool() {
        }
        Object.defineProperty(P2Tool, "stageHeight", {
            get: function () {
                return egret.lifecycle.stage.stageHeight;
            },
            enumerable: true,
            configurable: true
        });
        ;
        /**
         * 获得p2Body的egret显示旋转角度
         */
        P2Tool.convertP2BodyAngleToEgret = function (body) {
            var result;
            result = 360 - body.angle * 180 / Math.PI;
            return result;
        };
        /**
         * 把egret角度转换为p2角度
         */
        P2Tool.convertEgretAngleToP2 = function (angle) {
            var result;
            result = (360 - angle) * Math.PI / 180;
            return result;
        };
        /**
         * 物理世界的长度标量到显示世界的转换
         * 适合如 x,width,height的转换，y值不适合
         */
        P2Tool.convertP2ValueToEgret = function (value) {
            return value * this.factor;
        };
        /**
         * 显示世界物理世界的长度标量到物理世界的转换
         * 适合如 x,width,height的转换，y值不适合
         */
        P2Tool.convertEgretValueToP2 = function (value) {
            return value / this.factor;
        };
        /**
         * 把egretY值转换到p2Y值，仅适合y转换
         */
        P2Tool.convertEgretY_To_P2Y = function (egretY) {
            return (this.stageHeight - egretY) / this.factor;
        };
        /**
         * 把p2y值转换到egretY值，仅适合y转换
         */
        P2Tool.convertP2Y_To_EgretY = function (p2Y) {
            return this.stageHeight - p2Y * this.factor;
        };
        /**
        * 在物理世界创建一个矩形刚体，显示cube矢量图形
        */
        P2Tool.addOneBox = function (p2World, ctn, px, py, pw, ph, pAngle, type) {
            //在物理世界中的位置
            var p2x = this.convertEgretValueToP2(px); //显示位置变换到物理世界位置
            var p2y = this.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
            var p2Wid = this.convertEgretValueToP2(pw);
            var p2Hei = this.convertEgretValueToP2(ph);
            var p2Angle = this.convertEgretAngleToP2(pAngle);
            var display;
            var bodyShape = new p2.Box({ width: p2Wid, height: p2Hei }); //new p2.Rectangle(p2Wid, p2Hei);
            var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
            body.type = type;
            body.addShape(bodyShape); //给刚体添加p2.Shape
            p2World.addBody(body);
            display = P2Tool.createBoxSkin(pw, ph);
            //绑定刚体和显示皮肤
            body.displays = [display];
            ctn.addChild(display); //把皮肤添加到显示世界
            return body;
        };
        /**
        * 创建一个方形皮肤
        * 返回的图形锚点位于图形中心
        */
        P2Tool.createBoxSkin = function (width, height) {
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
        P2Tool.createBox = function (p2World, ctn, px, py, pw, ph, pAngle, type) {
            //在物理世界中的位置
            var p2x = this.convertEgretValueToP2(px); //显示位置变换到物理世界位置
            var p2y = this.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
            var p2Wid = this.convertEgretValueToP2(pw);
            var p2Hei = this.convertEgretValueToP2(ph);
            var p2Angle = this.convertEgretAngleToP2(pAngle);
            var display;
            var bodyShape = new p2.Box({ width: p2Wid, height: p2Hei }); //new p2.Rectangle(p2Wid, p2Hei);
            var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
            body.type = type;
            body.addShape(bodyShape); //给刚体添加p2.Shape
            p2World.addBody(body);
            display = P2Tool.createBoxSkin(pw, ph);
            body["display"] = display;
            ctn.displayListContainer.addChild(display); //把皮肤添加到显示世界
            return body;
        };
        P2Tool.factor = 30;
        return P2Tool;
    }());
    PhysicsDemo.P2Tool = P2Tool;
    __reflect(P2Tool.prototype, "PhysicsDemo.P2Tool");
})(PhysicsDemo || (PhysicsDemo = {}));
//# sourceMappingURL=P2Tool.js.map