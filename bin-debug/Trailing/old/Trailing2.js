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
var Trailing2 = (function (_super) {
    __extends(Trailing2, _super);
    function Trailing2() {
        var _this = _super.call(this) || this;
        _this._lineArr = [];
        _this._density = 0;
        _this._rectWidth = 3;
        _this._rectHeight = 30;
        return _this;
    }
    Trailing2.prototype.myload = function () {
        this.addListen();
    };
    Trailing2.prototype.addListen = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.clean, this);
        // egret.startTick(this.clean, this)
        // this.init();
    };
    Trailing2.prototype.init = function () {
    };
    Trailing2.prototype.onTouch = function (evt) {
        switch (evt.type) {
            case "touchBegin":
                this.createRect(evt.stageX, evt.stageY);
                this._oldTouchX = evt.stageX;
                this._oldTouchY = evt.stageY;
                break;
            case "touchMove":
                var x = evt.stageX - this._oldTouchX;
                var y = evt.stageY - this._oldTouchY;
                var dis = Math.pow(x * x + y * y, 0.5);
                var angle = Math.acos(x / dis);
                var angle2 = y < 0 ? -angle : angle; // 旋转角度
                // this.createMultiRect(dis, angle, angle2, y);    // 创建多个rect
                this.createOneRect(dis, angle, angle2, y); // 创建一个rect 很省性能
                this._oldTouchX = evt.stageX;
                this._oldTouchY = evt.stageY;
                break;
            case "touchEnd":
                if (this._lineArr.length > 0) {
                    for (var a = 0; a < this._lineArr.length; a++) {
                        this._lineArr[a]["type"] = 1;
                    }
                }
                break;
        }
    };
    Trailing2.prototype.createTriangle = function (x, y, height, angle2) {
        var triangle = new egret.Shape();
        triangle.graphics.beginFill(0xff9999);
        triangle.graphics.moveTo(x - height / 2, y - this._rectHeight / 2);
        triangle.graphics.lineTo(x + height / 2, y);
        triangle.graphics.lineTo(x - height / 2, y + this._rectHeight / 2);
        triangle.graphics.lineTo(x - height / 2, y + this._rectHeight);
        triangle.graphics.endFill();
        // triangle.anchorOffsetX = triangle.width / 2;
        // triangle.anchorOffsetY = triangle.height / 2;
        triangle.rotation = angle2 * 180 / Math.PI || 0;
        triangle["angle"] = angle2;
        triangle["x1"] = x;
        triangle["y1"] = y;
        this._oldTriangle = triangle;
        this.displayListContainer.addChild(triangle);
    };
    Trailing2.prototype.createOneRect = function (dis, angle, angle2, y) {
        var disTemp = dis / 2;
        var xTemp = disTemp * Math.cos(angle);
        var yTemp = disTemp * Math.sin(angle);
        // xTemp *= y < 0 ? -1 : 1;
        yTemp *= y < 0 ? -1 : 1;
        var x1 = this._oldTouchX + xTemp;
        var y1 = this._oldTouchY + yTemp;
        this._rectWidth = dis;
        if (this._oldTriangle) {
            this.createRect(this._oldTriangle["x1"], this._oldTriangle["y1"], this._oldTriangle["angle"]);
            this.displayListContainer.removeChild(this._oldTriangle);
        }
        this.createTriangle(x1, y1, dis, angle2);
    };
    Trailing2.prototype.createMultiRect = function (dis, angle, angle2, y) {
        var lineW = this._rectWidth; // 图形宽度
        var len = Math.ceil(dis / lineW);
        for (var i = 0; i < len; i++) {
            var disTemp = lineW * (i) + lineW / 2; // console.log(disTemp);
            var xTemp = disTemp * Math.cos(angle);
            var yTemp = disTemp * Math.sin(angle);
            yTemp *= y < 0 ? -1 : 1;
            var x1 = this._oldTouchX + xTemp;
            var y1 = this._oldTouchY + yTemp;
            this.createRect(x1, y1, angle2);
        }
    };
    Trailing2.prototype.createRect = function (x1, y2, angle) {
        // let effect: fairygui.GImage = this.createObject("effect");
        var effect = this.getShape();
        ;
        effect.graphics.beginFill(0xff9999);
        effect.graphics.drawRect(0, 0, this._rectWidth, this._rectHeight);
        effect.graphics.endFill();
        effect.rotation = angle * 180 / Math.PI || 0;
        // console.log("angle:", angle);
        effect['type'] = 0;
        effect.x = x1;
        effect.y = y2;
        effect.scaleX = 1;
        effect.scaleY = 0;
        // effect.setPivot(0.5, 0.5, true);
        // this.addChild(effect);
        effect.anchorOffsetX = effect.width / 2;
        effect.anchorOffsetY = effect.height / 2;
        this.displayListContainer.addChild(effect);
        this._lineArr.push(effect);
    };
    Trailing2.prototype.clean = function () {
        if (this._lineArr.length > 0) {
            for (var a = 0; a < this._lineArr.length; a++) {
                // console.log(this._lineArr[a]['type']);
                if (this._lineArr[a].scaleY < 0.6 && this._lineArr[a]['type'] == 0) {
                    // this._lineArr[a].scaleX = this._lineArr[a].scaleX + 0.06;
                    this._lineArr[a].scaleY = this._lineArr[a].scaleY + 0.06;
                }
                else {
                    this._lineArr[a]['type'] = 1;
                    // this._lineArr[a].scaleX = this._lineArr[a].scaleX - 0.06;
                    this._lineArr[a].scaleY = this._lineArr[a].scaleY - 0.1;
                    if (this._lineArr[a].scaleY <= 0) {
                        // this.removeChild(this._lineArr[a]);
                        this.displayListContainer.removeChild(this._lineArr[a]);
                        this._lineArr.splice(a--, 1);
                    }
                }
            }
        }
        return false;
    };
    Trailing2.prototype.getShape = function () {
        var self = this;
        if (this._shapePool)
            var sh = self._shapePool.shift();
        if (sh)
            sh.visible = true;
        return sh || new egret.Shape();
    };
    Trailing2.prototype.cacheShape = function (sh) {
        var self = this;
        sh.visible = false;
        sh.alpha = 1;
        sh.scaleX = 1;
        sh.scaleY = 1;
        sh.graphics.clear();
        self._shapePool.push(sh);
    };
    return Trailing2;
}(MyComponent));
__reflect(Trailing2.prototype, "Trailing2");
//# sourceMappingURL=Trailing2.js.map