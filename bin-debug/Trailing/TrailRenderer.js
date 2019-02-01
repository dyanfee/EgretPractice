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
/**
 * 模拟拖尾效果
 * 实现原理：每帧在目标移动的路径上生成一定密度圆形，图形scale与alpha渐变小即可模拟达到拖尾效果
 * 使用方法：new一个当前实例 => 执行init方法 => addChild到目标身上
 * Created by 张元涛 2018.8.16
 */
var TrailRenderer = (function (_super) {
    __extends(TrailRenderer, _super);
    function TrailRenderer() {
        var _this = _super.call(this) || this;
        _this.trailShapeCache = []; // 拖尾图形缓存
        _this.curColorIdx = 0; // 当前拖尾图形颜色索引
        var self = _this;
        self.once(egret.Event.ADDED_TO_STAGE, self.onAdded, self);
        self.once(egret.Event.REMOVED_FROM_STAGE, self.onRemoved, self);
        return _this;
    }
    /**
     * 拖尾参数初始化
     * @param life 拖尾持续时间
     * @param alphaFrom 初始透明度
     * @param alphaTo 结束透明度
     * @param colors 颜色数组，按数组循环使用颜色
     * @param density 拖尾密度，根据目标运动速度动态调整，默认一个像素绘制一个图形，即density==0时拖尾最密
     * @param width 拖尾宽度，默认等于目标宽度
     * @param ease 拖尾缓动函数 使用效果不是很明显，默认即可
     */
    TrailRenderer.prototype.init = function (life, alphaFrom, alphaTo, colors, density, width, ease) {
        if (life === void 0) { life = 500; }
        if (alphaFrom === void 0) { alphaFrom = 1; }
        if (alphaTo === void 0) { alphaTo = 0; }
        if (colors === void 0) { colors = [0xFFFFFF]; }
        if (density === void 0) { density = 0; }
        if (width === void 0) { width = 0; }
        if (ease === void 0) { ease = egret.Ease.sineInOut; }
        var self = this;
        self.trailDensity = density;
        self.trailLife = life;
        self.trailColors = colors;
        self.trailWidth = width;
        self.alphaFrom = alphaFrom;
        self.alphaTo = alphaTo;
        self.curColorIdx = 0;
        self.inited = true;
    };
    TrailRenderer.prototype.onAdded = function (e) {
        var self = this;
        self.addEventListener(egret.Event.ENTER_FRAME, self.onFrameEnter, self);
        self.target = self.parent;
        self.trailWidth = self.trailWidth || self.target.width;
    };
    TrailRenderer.prototype.onRemoved = function (e) {
        var self = this;
        self.trailShapeCache = null;
        self.removeEventListener(egret.Event.ENTER_FRAME, self.onFrameEnter, self);
    };
    TrailRenderer.prototype.onFrameEnter = function (e) {
        var self = this;
        if (!self.target || !self.inited)
            return;
        self.drawTrail();
    };
    TrailRenderer.prototype.drawTrail = function () {
        var self = this;
        if (!self.lastTargetPos) {
            self.lastTargetPos = {};
            self.lastTargetPos.x = self.target.x;
            self.lastTargetPos.y = self.target.y;
        }
        var dx = self.target.x - self.lastTargetPos.x;
        var dy = self.target.y - self.lastTargetPos.y;
        var dis = Math.sqrt(dx * dx + dy * dy);
        var angle = Math.acos(dx / dis);
        var color = self.getCurColor();
        var density = self.trailDensity || dis;
        var _loop_1 = function (i) {
            var disTemp = dis / density * i;
            var xTemp = disTemp * Math.cos(angle);
            var yTemp = disTemp * Math.sin(angle);
            yTemp *= dy < 0 ? -1 : 1; // 象限问题处理
            var x = self.target.x - xTemp;
            var y = self.target.y - yTemp;
            var sh = self.drawTrailShape(x, y, color);
            self.addTrailShape(sh);
            // 平滑处理：该帧所有图形做大小渐变
            var frameTime = 33; // 一帧33ms，根据帧率调整
            var initScale = 1 - frameTime / self.trailLife / density * i;
            egret.Tween.get(sh).set({ scaleX: initScale, scaleY: initScale })
                .to({ alpha: self.alphaTo, scaleX: 0, scaleY: 0 }, self.trailLife, self.trailEase)
                .call(function () {
                self.removeTrailShape(sh);
                self.cacheShape(sh);
            });
        };
        // 该帧到上帧的位置平均插入density个拖尾图形
        for (var i = 0; i < density; i++) {
            _loop_1(i);
        }
        self.lastTargetPos.x = self.target.x;
        self.lastTargetPos.y = self.target.y;
    };
    // 添加拖尾图片，注意要跟目标平级
    TrailRenderer.prototype.addTrailShape = function (sh) {
        var self = this;
        self.target.parent.addChildAt(sh, 0);
    };
    // private createOneRect(dis, angle, angle2, y) {
    // 	let disTemp = dis / 2;
    // 	let xTemp = disTemp * Math.cos(angle);
    // 	let yTemp = disTemp * Math.sin(angle);
    // 	// xTemp *= y < 0 ? -1 : 1;
    // 	yTemp *= y < 0 ? -1 : 1;
    // 	let x1 = this._oldTouchX + xTemp;
    // 	let y1 = this._oldTouchY + yTemp;
    // 	this._rectWidth = dis;
    // 	this.createLine(x1, y1, angle2);
    // }
    // private createMultiRect(dis, angle, angle2, y) {
    // 	let lineW = this._rectWidth;  // 图形宽度
    // 	let len = Math.ceil(dis / lineW);
    // 	for (let i = 0; i < len; i++) {
    // 		let disTemp = lineW * (i) + lineW / 2;
    // 		// console.log(disTemp);
    // 		let xTemp = disTemp * Math.cos(angle);
    // 		let yTemp = disTemp * Math.sin(angle);
    // 		// xTemp *= y < 0 ? -1 : 1;
    // 		yTemp *= y < 0 ? -1 : 1;
    // 		let x1 = this._oldTouchX + xTemp;
    // 		let y1 = this._oldTouchY + yTemp;
    // 		this._rectWidth = dis;
    // 		this.createLine(x1, y1, angle2);
    // 	}
    // }
    TrailRenderer.prototype.removeTrailShape = function (sh) {
        var self = this;
        self.target.parent.removeChild(sh);
    };
    // 画拖尾图形
    TrailRenderer.prototype.drawTrailShape = function (x, y, color) {
        var self = this;
        var sh = self.getCacheShape() || new egret.Shape();
        sh.graphics.beginFill(color, self.alphaFrom);
        sh.graphics.drawCircle(0, 0, self.trailWidth * 0.5);
        sh.graphics.endFill();
        sh.x = x;
        sh.y = y;
        return sh;
    };
    // 循环获取颜色
    TrailRenderer.prototype.getCurColor = function () {
        var self = this;
        var c = self.trailColors[self.curColorIdx++];
        if (self.curColorIdx > self.trailColors.length - 1)
            self.curColorIdx = 0;
        return c;
    };
    TrailRenderer.prototype.getCacheShape = function () {
        var self = this;
        var sh = self.trailShapeCache.pop() || null;
        if (sh)
            sh.visible = true;
        return sh;
    };
    // 缓存图形
    TrailRenderer.prototype.cacheShape = function (sh) {
        var self = this;
        sh.visible = false;
        sh.alpha = 1;
        sh.scaleX = 1;
        sh.scaleY = 1;
        sh.graphics.clear();
        self.trailShapeCache.push(sh);
    };
    return TrailRenderer;
}(egret.Sprite));
__reflect(TrailRenderer.prototype, "TrailRenderer");
