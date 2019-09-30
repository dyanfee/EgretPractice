module Collision {
	export class RectTest extends MyComponent {
		public constructor() {
			super();
		}
		private _rect1: fairygui.GComponent;
		private _rect2: fairygui.GComponent;
		private _rotStep: number = 1;
		private _moveStep: number = 4;
		myload() {
			this._rect1 = this.getChild("rect1").asCom;
			this._rect2 = this.getChild("rect2").asCom;
			this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
			let p: IRectData2 = <IRectData2>{}
			p.point = <IPoint>{};
			p.point.x = 1;
			p.point.y = 2;
			p.width = 3;
			p.height = 4;
			console.log(p);

		}

		/**
		 * 带角度的两个矩形包围检测
		 * rect1  大的矩形
		 * rect2  小的矩形
		 */
		checkCollision(rect1: IRectData, rect2: IRectData) {
			let p = this.getRectPos(rect1);
			let q = this.getRectPos(rect2);
			this.drawShape(q[0], q[1], q[2], q[3]);
			return this.isPointInRect(p[0], p[1], p[2], p[3], q[0]) &&
				this.isPointInRect(p[0], p[1], p[2], p[3], q[1]) &&
				this.isPointInRect(p[0], p[1], p[2], p[3], q[2]) &&
				this.isPointInRect(p[0], p[1], p[2], p[3], q[3])
		}
		private getRectPos(rect: IRectData) {
			let p1: number[] = [- rect.width * 0.5, - rect.height * 0.5];
			let p2: number[] = [rect.width * 0.5, - rect.height * 0.5];
			let p3: number[] = [rect.width * 0.5, rect.height * 0.5];
			let p4: number[] = [- rect.width * 0.5, rect.height * 0.5];
			p1 = this.transPoint2(p1, rect);
			p2 = this.transPoint2(p2, rect);
			p3 = this.transPoint2(p3, rect);
			p4 = this.transPoint2(p4, rect);
			let pos = [p1, p2, p3, p4];
			return pos;
		}
		private transPoint2(p: number[], rect) {
			let angle = rect.rotation * Math.PI / 180;
			let x1 = p[0] * Math.cos(angle) - p[1] * Math.sin(angle) + rect.x;
			let y1 = p[0] * Math.sin(angle) + p[1] * Math.cos(angle) + rect.y;
			return [x1, y1]
		}
		private mult(p1, p2, p) {
			return (p2[0] - p1[0]) * (p[1] - p1[1]) - (p[0] - p1[0]) * (p2[1] - p1[1])
		}
		private isPointInRect(p1, p2, p3, p4, p) {
			return this.mult(p1, p2, p) * this.mult(p3, p4, p) >= 0 && this.mult(p4, p1, p) * this.mult(p2, p3, p) >= 0
		}
		private transPoint(p: number[], x, y, rotation) {
			let angle = rotation * Math.PI / 180;
			let x1 = (p[0] - x) * Math.cos(angle) - (p[1] - y) * Math.sin(angle) + x;
			let y1 = (p[0] - x) * Math.sin(angle) + (p[1] - y) * Math.cos(angle) + y;
			return [x1, y1]
		}
		private _rectShap: egret.Shape;
		drawShape(p1, p2, p3, p4) {
			if (!this._rectShap) {
				this._rectShap = new egret.Shape();
				this.displayListContainer.addChild(this._rectShap);
			}
			this._rectShap.graphics.clear();
			this._rectShap.graphics.lineStyle(3, 0x0000ff);
			this._rectShap.graphics.moveTo(p1[0], p1[1]);
			this._rectShap.graphics.lineTo(p2[0], p2[1]);
			this._rectShap.graphics.lineTo(p3[0], p3[1]);
			this._rectShap.graphics.lineTo(p4[0], p4[1]);
			this._rectShap.graphics.lineTo(p1[0], p1[1]);
		}
		onFrame() {
			if (KeyBoardMgr.isDown(KeyBoardMgr.W)) {
				this._rect2.x += Math.sin((this._rect2.rotation) / 180 * Math.PI) * this._moveStep;
				this._rect2.y -= Math.cos((this._rect2.rotation) / 180 * Math.PI) * this._moveStep;
			}
			if (KeyBoardMgr.isDown(KeyBoardMgr.S)) {
				this._rect2.x -= Math.sin((this._rect2.rotation) / 180 * Math.PI) * this._moveStep;
				this._rect2.y += Math.cos((this._rect2.rotation) / 180 * Math.PI) * this._moveStep;
			}
			if (KeyBoardMgr.isDown(KeyBoardMgr.A)) {
				this._rect2.rotation -= this._rotStep;
			}
			if (KeyBoardMgr.isDown(KeyBoardMgr.D)) {
				this._rect2.rotation += this._rotStep;
			}
			if (KeyBoardMgr.isDown(KeyBoardMgr.UP)) {
				this._rect1.x += Math.sin((this._rect1.rotation) / 180 * Math.PI) * this._moveStep;
				this._rect1.y -= Math.cos((this._rect1.rotation) / 180 * Math.PI) * this._moveStep;
			}
			if (KeyBoardMgr.isDown(KeyBoardMgr.DOWN)) {
				this._rect1.x -= Math.sin((this._rect1.rotation) / 180 * Math.PI) * this._moveStep;
				this._rect1.y += Math.cos((this._rect1.rotation) / 180 * Math.PI) * this._moveStep;
			}
			if (KeyBoardMgr.isDown(KeyBoardMgr.LEFT)) {
				this._rect1.rotation -= this._rotStep;
			}
			if (KeyBoardMgr.isDown(KeyBoardMgr.RIGHT)) {
				this._rect1.rotation += this._rotStep;
			}
			this.checkCollision(this._rect1, this._rect2)

		}
	}
	export interface IRectData {
		x: number;
		y: number;
		width: number;
		height: number;
		rotation: number;
	}
	export interface IRectData2 {
		point: IPoint
		width: number;
		height: number;
		rotation: number;
	}
}