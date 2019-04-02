class Trailing extends MyComponent {
	public constructor() {
		super();
	}
	myload() {
		this.addListen();
	}
	private _lineArr: any[] = [];
	private _density: number = 0;
	private _rectWidth: number = 3;
	private _rectHeight: number = 30;
	private addListen() {
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.clean, this);
		// egret.startTick(this.clean, this)
		// this.init();
	}
	private init() {

	}
	private _oldTouchX: number;
	private _oldTouchY: number;
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
				let angle2 = y < 0 ? - angle : angle; // 旋转角度

				// this.createMultiRect(dis, angle, angle2, y);    // 创建多个rect
				this.createOneRect(dis, angle, angle2, y);   // 创建一个rect 很省性能


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
	private createOneRect(dis, angle, angle2, y) {
		let disTemp = dis / 2;
		let xTemp = disTemp * Math.cos(angle);
		let yTemp = disTemp * Math.sin(angle);
		yTemp *= y < 0 ? -1 : 1;
		let x1 = this._oldTouchX + xTemp;
		let y1 = this._oldTouchY + yTemp;
		this._rectWidth = dis;
		this.createRect(x1, y1, angle2);
	}
	private createMultiRect(dis, angle, angle2, y) {
		let lineW = this._rectWidth;  // 图形宽度
		let len = Math.ceil(dis / lineW);
		for (let i = 0; i < len; i++) {
			let disTemp = lineW * (i + 1 / 2);
			let xTemp = disTemp * Math.cos(angle);
			let yTemp = disTemp * Math.sin(angle);
			yTemp *= y < 0 ? -1 : 1;
			let x1 = this._oldTouchX + xTemp;
			let y1 = this._oldTouchY + yTemp;
			this.createRect(x1, y1, angle2);
		}
	}
	private createRect(x1, y2, angle?) {
		// let effect: fairygui.GImage = this.createObject("effect");
		let effect: egret.Shape = this.getShape();
		console.log(effect.hashCode);

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
	}
	private clean() {
		if (this._lineArr.length > 0) {
			for (let a = 0; a < this._lineArr.length; a++) {
				// console.log(this._lineArr[a]['type']);
				if (this._lineArr[a].scaleY < 0.4 && this._lineArr[a]['type'] == 0) {
					// this._lineArr[a].scaleX = this._lineArr[a].scaleX + 0.06;
					this._lineArr[a].scaleY = this._lineArr[a].scaleY + 0.2;

				}
				else {
					this._lineArr[a]['type'] = 1;
					// this._lineArr[a].scaleX = this._lineArr[a].scaleX - 0.06;
					this._lineArr[a].scaleY = this._lineArr[a].scaleY - 0.1;
					if (this._lineArr[a].scaleY <= 0) {
						// this.removeChild(this._lineArr[a]);
						this.displayListContainer.removeChild(this._lineArr[a]);
						this.cacheShape(this._lineArr[a]);
						this._lineArr.splice(a--, 1);
					}
				}
			}
		}
		return false;
	}
	private _shapePool: any[];
	private getShape() {
		let self = this;
		if (this._shapePool)
			var sh = self._shapePool.shift();
		if (sh) sh.visible = true;

		return sh || new egret.Shape();
	}
	private cacheShape(sh) {
		if (!this._shapePool) this._shapePool = [];
		let self = this;
		sh.visible = false;
		sh.alpha = 1;
		sh.scaleX = 1;
		sh.scaleY = 1;
		sh.graphics.clear();
		self._shapePool.push(sh);
	}
}	