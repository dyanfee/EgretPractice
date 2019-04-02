module DragPro {
	export class DragDemoMain extends MyComponent {
		public constructor() {
			super();
		}

		// 开始拖拽
		private _initPoint: egret.Point;

		// 结束拖拽
		private _lastPoint: egret.Point;



		// 抛物线计算参数
		private g: number = 900;
		private angle: number = 0;

		// 第二种抛物线
		private gr: number = 0.2;
		private minSpeed: number = 5;
		private maxPower: number = 14;


		// 起点与终点最大距离
		private MAX_DISTANCE: number = 200;

		// 角度
		private _radian: number;
		myload() {
			this.myinit();
			this.addListen();
		}
		public myinit() {
			this._initPoint = new egret.Point();
			this._lastPoint = new egret.Point();
		}

		private addListen() {
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touch, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touch, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.touch, this);

		}

		public beginDrag(initpoint: egret.Point) {
			this._radian = 0;
			this._initPoint = initpoint;
		}

		private _time: number;

		private touch(evt: egret.TouchEvent) {
			// console.log(evt.type);

			switch (evt.type) {
				case "touchBegin":
					this._initPoint.x = evt.stageX;
					this._initPoint.y = evt.stageY;
					this._time = egret.getTimer();
					break;
				case "touchMove":
					this._lastPoint.x = evt.stageX;
					this._lastPoint.y = evt.stageY;

					this.testDrawPowerLine(this._initPoint, this._lastPoint);

					if (egret.getTimer() - this._time < 50) return;
					this._time = egret.getTimer();

					if (this._pointList) this.releasePointList();
					// this.testDrawParabola();
					this.bezierParabola();
					// this.testParabola(this._initPoint, this._lastPoint);
					// this.test(this._initPoint, this._lastPoint);
					break;
				case "touchEnd":

					// 清除线条
					if (this._powerLine) this._powerLine.graphics.clear();

					// 清除点列表
					// if (this._pointList) this.releasePointList();
					// 绘制曲线
					// this.testDrawBezier(this._initPoint, new egret.Point(this._initPoint.x + 100, this._initPoint.y - 100), this._lastPoint);
					break;
			}
		}


		private _speedX: number;
		private _speedY: number;
		private _totalTime: number;
		private _drawCrew: number = 20;
		// 第二种计算抛物线方案 X = Vx * t   Y = (Vy-g)*t
		private testParabola(beginPoint: egret.Point, endPoint) {
			// 计算角度和蓄力程度
			// let len = Math.sqrt(Math.pow((endPoint.x - beginPoint.x), 2) + Math.pow((endPoint.y - beginPoint.y), 2));
			let len = egret.Point.distance(beginPoint, endPoint);
			// len = Math.floor(len * 100) / 100;
			let radian = Math.atan2((endPoint.y - beginPoint.y), (endPoint.x - beginPoint.x));
			// radian = Math.floor(radian * 100) / 100;
			console.log(len, radian);
			this.powerRate = len / this.MAX_DISTANCE;
			let speed = 19;
			// console.log(speed);
			this._speedX = 18;
			// this._speedX = Math
			this._speedY = Math.sin(-radian) * speed;
			let r = Math.abs(radian);
			if (r >= Math.PI / 2 && r <= Math.PI * 0.75) {
				this._speedX *= (Math.cos(radian) * Math.cos(Math.PI / 4));
			}
			if (radian <= Math.PI / 2 && radian >= -Math.PI / 2) {
				this._speedX = 0.1;
				this._speedY = Math.sin(-radian) > 0 ? 19 : -19;
			}
			this._speedX = this._speedX < 0 ? -this._speedX : this._speedX;
			// if (!this._speedX) this._speedX = 0;
			// if (!this._speedY) this._speedY = 0;
			// console.log(this._speedX, this._speedY);
			let t0 = this.width / this._speedX
			this._totalTime = t0 > 150 ? 150 : t0;
			// console.log(this.width, this._totalTime, this._speedX);
			let y = 350, x = 0;
			let t = 0;
			while (t < this._totalTime) {
				t += 1;
				let item = ComPools.instance.getCom("Point").asCom;
				item.x = (x += this._speedX);
				item.y = (y += (this._speedY += this.gr));
				this.addChild(item);
				this._pointList.push(item);
			}

		}



		// 第二种计算抛物线方案 X = Vx * t   Y = (Vy-g)*t
		private test(beginPoint: egret.Point, endPoint) {
			// 计算角度和蓄力程度
			let len = egret.Point.distance(beginPoint, endPoint);
			let radian = Math.atan2((endPoint.y - beginPoint.y), (endPoint.x - beginPoint.x));
			this.powerRate = len / this.MAX_DISTANCE;
			let speed = 18;
			this._speedX = Math.cos(radian) * speed;
			this._speedY = Math.sin(-radian) * speed;
			// let r = Math.abs(radian);
			// if (r >= Math.PI / 2 && r <= Math.PI * 0.75) {
			// 	this._speedX *= (Math.cos(radian) * Math.cos(Math.PI / 4));
			// }
			if (radian <= Math.PI / 2 && radian >= -Math.PI / 2) {
				this._speedX = 0;
				this._speedY = Math.sin(-radian) > 0 ? 19 : -19;
			}
			this._speedX = this._speedX < 0 ? -this._speedX : this._speedX;
			let t0 = this.width / this._speedX
			this._totalTime = t0 > 150 ? 150 : t0;
			let y = 350, x = 0;
			let t = 0;

			let scale = 1;

			while (t < this._totalTime) {
				t += 1;
				let item = ComPools.instance.getCom("Point").asCom;
				item.x = (x += this._speedX * scale);
				item.y = (y += (this._speedY += this.gr) * scale);
				this.addChild(item);
				this._pointList.push(item);
			}

		}


		// 力量比例
		private powerRate: number;
		// 初速度
		private vSpeed: number;
		// 最大速度
		private MAX_INCREASE_SPEED: number = 700;
		// 最小速度
		private miniSpeed: number = 300;

		// 绘制距离
		private DRAW_DISTANCE: number = 15;

		// 绘制点列表
		private _pointList: fairygui.GComponent[] = [];
		/**
		 * 		绘制抛物线
		 * 
		 */
		private testDrawParabola() {

			let distance = egret.Point.distance(this._initPoint, this._lastPoint);
			// distance = distance > this.MAX_DISTANCE ? this.MAX_DISTANCE : distance;
			this.powerRate = distance / this.MAX_DISTANCE;
			this.vSpeed = this.miniSpeed + Math.round(this.powerRate * this.MAX_INCREASE_SPEED);
			console.log(this.vSpeed);

			let y = 350, x = 0;
			let n = 100;
			let t = 0;
			while (n > 0) {
				n--;
				t += 0.02;
				x += this.DRAW_DISTANCE;
				// y = x * Math.tan(this.angle) - this.g * x * x / (2 * Math.pow(this.vSpeed * Math.cos(this.angle), 2));
				// y = this.vSpeed * t * Math.sin(this.angle) - 500 * t * t / 2 + 350;
				// let angle = 

				y = -(this.vSpeed * t * Math.sin(this.angle) - (1000 * t * t) / 2) + 350;
				console.log(this.vSpeed, y, t, Math.sin(this.angle), this.angle * 180 / Math.PI);

				let item = ComPools.instance.getCom("Point").asCom;
				item.x = x;
				item.y = y;
				this.addChild(item);
				this._pointList.push(item);
			}
		}

		// release point list
		private releasePointList() {
			if (this._pointList) {
				this._pointList.forEach(e => {
					ComPools.instance.disposeCom("Point", e);
				})
				this._pointList.length = 0;
			}
		}

		private scaleRate: number = 5;
		// bezier 曲线点
		private P0: egret.Point = new egret.Point(0, 350);
		private P1: egret.Point;
		private P2: egret.Point;
		private P1XLimit: number = 100;
		private P2XLimit: number = 300;
		// 计算抛物线数据  bezier 三个点
		private bezierParabola() {
			let p1 = new egret.Point();
			let distance = egret.Point.distance(this._initPoint, this._lastPoint);
			distance = distance > this.MAX_DISTANCE ? this.MAX_DISTANCE : distance;

			let x1 = -distance * Math.cos(this.angle) * this.scaleRate;
			x1 = x1 < this.P1XLimit ? this.P1XLimit : x1;
			let y1 = - distance * Math.sin(this.angle) * this.scaleRate * 2 + this.P0.y;
			y1 = y1 > this.P0.y ? this.P0.y : y1;
			this.P1 = egret.Point.create(x1, y1)
			this.drawTestPoint1(x1, y1);
			// console.log(Math.sin(this.angle), x1, y1);

			let x2 = -distance * Math.cos(this.angle) * this.scaleRate * 5;
			x2 = x2 < this.P2XLimit ? this.P2XLimit : x2;
			let y2 = this.height;
			this.P2 = egret.Point.create(x2, y2);
			this.drawTestPoint2(x2, y2);
			// 绘制beizer曲线
			this.testDrawBezier(this.P0, this.P1, this.P2);
			egret.Point.release(this.P1);
			egret.Point.release(this.P2);


		}

		private _testPoint1: egret.Shape;
		// 绘制测试点P1
		private drawTestPoint1(x, y) {
			(!this._testPoint1) && (this._testPoint1 = new egret.Shape());
			this._testPoint1.graphics.clear();
			this._testPoint1.graphics.beginFill(0xdf001f);
			this._testPoint1.graphics.drawCircle(x, y, 5);
			this._testPoint1.graphics.endFill();
			this.displayListContainer.addChild(this._testPoint1);
		}
		private _testPoint2: egret.Shape;
		// 绘制测试点P2
		private drawTestPoint2(x, y) {
			(!this._testPoint2) && (this._testPoint2 = new egret.Shape());
			this._testPoint2.graphics.clear();
			this._testPoint2.graphics.beginFill(0x5fb336);
			this._testPoint2.graphics.drawCircle(x, y, 5);
			this._testPoint2.graphics.endFill();
			this.displayListContainer.addChild(this._testPoint2);
		}

		private _bezierLine: egret.Shape;
		/**
		 * Bezier 曲线
		 * 公式 B = ( 1 - t )^2 * P0 + 2 * t * ( 1 - t ) P1 + t^2 * P2
		*/
		private testDrawBezier(beginPoint, powerPoint, endPoint) {
			if (this._bezierLine) this._bezierLine.graphics.clear();
			let line = new egret.Shape();
			line.graphics.lineStyle(4, 0x87CEFA, 1, false, "normal", null, null, 3, [10, 10]);
			line.graphics.moveTo(beginPoint.x, beginPoint.y);
			line.graphics.curveTo(powerPoint.x, powerPoint.y, endPoint.x, endPoint.y);
			line.graphics.endFill();
			this.displayListContainer.addChild(line);
			this._bezierLine = line;
		}
		private _powerLine: egret.Shape;
		//  绘制拉力线
		private testDrawPowerLine(beginPoint: egret.Point, endPoint) {
			if (!this._powerLine) this._powerLine = new egret.Shape();
			let distance = egret.Point.distance(beginPoint, endPoint)
			// 计算最长距离 并限制
			endPoint = distance > this.MAX_DISTANCE ? egret.Point.interpolate(beginPoint, endPoint, 1 - this.MAX_DISTANCE / distance) : endPoint;
			this._lastPoint = endPoint;
			// console.log(egret.Point.distance(beginPoint, endPoint));


			this._powerLine.graphics.clear();
			this._powerLine.graphics.lineStyle(2, 0x33ff33);
			this._powerLine.graphics.moveTo(beginPoint.x, beginPoint.y);
			this._powerLine.graphics.lineTo(endPoint.x, endPoint.y);
			this._powerLine.graphics.endFill();
			this.displayListContainer.addChild(this._powerLine);

			// 计算角度 弧度转角度
			let angle = Math.atan2(endPoint.y - beginPoint.y, endPoint.x - beginPoint.x);

			this.angle = angle;
			// console.log("calcAngle:", angle);

		}



	}
}