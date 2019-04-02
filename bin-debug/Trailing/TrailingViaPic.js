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
/** 使用图片绘制尾巴 */
var Trailing3 = (function (_super) {
    __extends(Trailing3, _super);
    function Trailing3() {
        var _this = _super.call(this) || this;
        // 存放绘制矩形的数组
        _this._lineArr = [];
        // 每个图片的默认大小 宽度固定 高度缩放
        _this._rectWidth = 3; //注意 使用每段创建一个矩形方法时失效 无需定义
        _this._rectHeight = 30;
        // 绘制拖尾最宽位置缩放大小
        _this._maxScale = 0.4;
        // 每帧增加缩放大小 越小前端越长
        _this._increScale = 0.2;
        // 每帧缩小大小  越小后端越长
        _this._reducScale = 0.07;
        return _this;
    }
    Trailing3.prototype.myload = function () {
        this.addListen();
    };
    Trailing3.prototype.addListen = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.clean, this);
    };
    Trailing3.prototype.removeListen = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.clean, this);
    };
    Trailing3.prototype.onTouch = function (evt) {
        switch (evt.type) {
            case "touchBegin":
                // this.createRect(evt.stageX, evt.stageY);
                this._oldTouchX = evt.stageX;
                this._oldTouchY = evt.stageY;
                break;
            case "touchMove":
                var x = evt.stageX - this._oldTouchX;
                var y = evt.stageY - this._oldTouchY;
                var dis = Math.pow(x * x + y * y, 0.5);
                var angle = Math.acos(x / dis);
                angle *= y < 0 ? -1 : 1;
                // this.createMultiRect(dis, angle);    // 创建多个rect
                this.createOneRect(dis, angle); // 创建一个rect 很省性能  效果一样
                this._oldTouchX = evt.stageX;
                this._oldTouchY = evt.stageY;
                break;
            case "touchEnd":
                if (this._lineArr.length > 0) {
                    // let len = Math.floor(this._lineArr.length * 0.2);
                    for (var a = 0; a < this._lineArr.length; a++) {
                        this._lineArr[a]["type"] = 1;
                    }
                }
                break;
        }
    };
    /**
     * 创建核心方法
     * @param  dis 上个点击位置与当前位置的距离
     * @param angle  直接计算得到的旋转角度
     */
    Trailing3.prototype.createOneRect = function (dis, angle) {
        var disTemp = dis / 2;
        var x1 = this._oldTouchX + disTemp * Math.cos(angle);
        var y1 = this._oldTouchY + disTemp * Math.sin(angle);
        this._rectWidth = dis;
        this.createRect(x1, y1, angle);
    };
    Trailing3.prototype.createMultiRect = function (dis, angle) {
        var len = Math.ceil(dis / this._rectWidth);
        for (var i = 0; i < len; i++) {
            var disTemp = this._rectWidth * (i + 1 / 2);
            var xTemp = disTemp * Math.cos(angle);
            var yTemp = disTemp * Math.sin(angle);
            // let angle2 = y < 0 ? - angle : angle; // 旋转角度 顺时针为正
            // yTemp *= y < 0 ? -1 : 1;
            var x1 = this._oldTouchX + xTemp;
            var y1 = this._oldTouchY + yTemp;
            this.createRect(x1, y1, angle);
        }
    };
    Trailing3.prototype.createRect = function (x1, y2, angle) {
        var effect = this.getShape();
        effect.width = this._rectWidth;
        effect.height = this._rectHeight;
        effect.rotation = angle * 180 / Math.PI || 0;
        effect.setPivot(0.5, 0.5, true); // 设置锚点到中心
        effect['type'] = 0;
        effect.x = x1;
        effect.y = y2;
        effect.scaleX = 1;
        effect.scaleY = 0;
        this.addChild(effect);
        this._lineArr.push(effect);
    };
    // 帧事件清理尾巴
    Trailing3.prototype.clean = function () {
        // 遍历存放矩形的数组 设置大小
        if (this._lineArr.length > 0) {
            for (var a = 0; a < this._lineArr.length; a++) {
                if (this._lineArr[a]['type'] == 0 && this._lineArr[a].scaleY < this._maxScale) {
                    // this._lineArr[a].scaleX = this._lineArr[a].scaleX + 0.06;
                    this._lineArr[a].scaleY = this._lineArr[a].scaleY + this._increScale;
                }
                else {
                    this._lineArr[a]['type'] = 1;
                    // this._lineArr[a].scaleX = this._lineArr[a].scaleX - 0.06;
                    this._lineArr[a].scaleY = this._lineArr[a].scaleY - this._reducScale;
                    if (this._lineArr[a].scaleY <= 0) {
                        this.cacheShape(this._lineArr[a]);
                        this._lineArr.splice(a--, 1);
                    }
                }
            }
        }
        return false;
    };
    Trailing3.prototype.getShape = function () {
        var self = this;
        var img;
        if (self._picPool && self._picPool.length != 0)
            img = self._picPool.shift();
        else
            img = fairygui.UIPackage.createObject(Data.pkgName, "pic").asImage;
        return img;
    };
    Trailing3.prototype.cacheShape = function (img) {
        var self = this;
        // console.log(self._picPool);
        if (!self._picPool)
            self._picPool = [];
        if (self._picPool.length < 100) {
            img.removeFromParent();
            img.scaleX = 1;
            img.scaleY = 1;
            self._picPool.push(img);
        }
        else {
            img.dispose();
            img = null;
        }
    };
    Trailing3.prototype.dispose = function () {
        this.removeListen();
        this._picPool = null;
        this._lineArr = null;
        _super.prototype.dispose.call(this);
    };
    return Trailing3;
}(MyComponent));
__reflect(Trailing3.prototype, "Trailing3");
//# sourceMappingURL=TrailingViaPic.js.map