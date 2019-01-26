/** 使用图片绘制尾巴 */
class Trailing3 extends MyComponent {
	public constructor() {
		super();
	}
	onload() {
		this.addListen();
	}

	// 记录上次点击位置
	private _oldTouchX: number;
	private _oldTouchY: number;
	// 存放绘制矩形的数组
	private _lineArr: any[] = [];
	// 每个图片的默认大小 宽度固定 高度缩放
	private _rectWidth: number = 3;//注意 使用每段创建一个矩形方法时失效 无需定义
	private _rectHeight: number = 30;
	// 绘制拖尾最宽位置缩放大小
	private _maxScale: number = 0.4;
	// 每帧增加缩放大小 越小前端越长
	private _increScale: number = 0.2;
	// 每帧缩小大小  越小后端越长
	private _reducScale: number = 0.07;
	private addListen() {
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.clean, this);
	}
	private removeListen() {
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.clean, this);
	}
	private onTouch(evt: egret.TouchEvent) {
		switch (evt.type) {
			case "touchBegin":
				// this.createRect(evt.stageX, evt.stageY);
				this._oldTouchX = evt.stageX;
				this._oldTouchY = evt.stageY;
				break;
			case "touchMove":
				let x = evt.stageX - this._oldTouchX;
				let y = evt.stageY - this._oldTouchY;
				let dis = Math.pow(x * x + y * y, 0.5);
				let angle = Math.acos(x / dis);
				angle *= y < 0 ? -1 : 1;

				// this.createMultiRect(dis, angle);    // 创建多个rect
				this.createOneRect(dis, angle);   // 创建一个rect 很省性能  效果一样


				this._oldTouchX = evt.stageX;
				this._oldTouchY = evt.stageY;

				break;
			case "touchEnd":
				if (this._lineArr.length > 0) {
					// let len = Math.floor(this._lineArr.length * 0.2);
					for (let a = 0; a < this._lineArr.length; a++) {
						this._lineArr[a]["type"] = 1;
					}
				}
				break;
		}
	}
	/**
	 * 创建核心方法
	 * @param  dis 上个点击位置与当前位置的距离
	 * @param angle  直接计算得到的旋转角度 
	 */
	private createOneRect(dis, angle) {
		let disTemp = dis / 2;
		let x1 = this._oldTouchX + disTemp * Math.cos(angle);
		let y1 = this._oldTouchY + disTemp * Math.sin(angle);
		this._rectWidth = dis;
		this.createRect(x1, y1, angle);
	}
	private createMultiRect(dis, angle) {
		let len = Math.ceil(dis / this._rectWidth);
		for (let i = 0; i < len; i++) {
			let disTemp = this._rectWidth * (i + 1 / 2);
			let xTemp = disTemp * Math.cos(angle);
			let yTemp = disTemp * Math.sin(angle);
			// let angle2 = y < 0 ? - angle : angle; // 旋转角度 顺时针为正
			// yTemp *= y < 0 ? -1 : 1;
			let x1 = this._oldTouchX + xTemp;
			let y1 = this._oldTouchY + yTemp;
			this.createRect(x1, y1, angle);
		}
	}
	private createRect(x1, y2, angle?) {
		let effect: fairygui.GImage = this.getShape();
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
	}
	// 帧事件清理尾巴
	private clean() {
		// 遍历存放矩形的数组 设置大小
		if (this._lineArr.length > 0) {
			for (let a = 0; a < this._lineArr.length; a++) {
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
	}
	private _picPool: any[];
	private getShape(): fairygui.GImage {
		let self = this;
		let img: fairygui.GImage;
		if (self._picPool && self._picPool.length != 0)
			img = self._picPool.shift();
		else
			img = fairygui.UIPackage.createObject(Data.pkgName, "pic").asImage;
		return img;
	}
	private cacheShape(img: fairygui.GImage) {
		let self = this;
		// console.log(self._picPool);

		if (!self._picPool) self._picPool = [];
		if (self._picPool.length < 100) {
			img.removeFromParent();
			img.scaleX = 1;
			img.scaleY = 1;
			self._picPool.push(img);
		} else {
			img.dispose();
			img = null;
		}
	}
	public dispose() {
		this.removeListen();
		this._picPool = null;
		this._lineArr = null;
		super.dispose();
	}
}	