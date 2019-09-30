module PhysicsDemo {
	/**
	 * 转换数值尝试
	 * 小车轮胎约束
	 */
	export class P_demo4 extends MyComponent {
		private world: p2.World;
		private debugDraw: p2DebugDraw;
		private stageHeight: number = egret.lifecycle.stage.stageHeight;
		public constructor() {
			super();
			this.initScreen();
		}
		private initScreen() {
			this.createWorld();
			// this.createGround();
			this.createCar();
			this.createDebug();
			egret.lifecycle.stage.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
			//鼠标点击添加刚体
			egret.lifecycle.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
		}
		private createWorld() {
			this.world = new p2.World();
			this.world.sleepMode = p2.World.BODY_SLEEPING;
			this.world.gravity = [0, 0];
		}
		private createGround() {
			let shape: p2.Plane = new p2.Plane();
			let body: p2.Body = new p2.Body();
			// body.position[1] = this.stageHeight - 100;
			body.position[0] = egret.lifecycle.stage.stageWidth - 600;
			body.angle = -Math.PI / 2;
			// body.angle = Math.PI;
			body.addShape(shape);
			this.world.addBody(body);
		}
		// 车身刚体 --
		private physBody: p2.Body;
		// 左前轮
		private phyLFWheel: p2.Body;
		// 右前轮
		private phyRFWheel: p2.Body;
		// 左后轮
		private phyLBWheel: p2.Body;
		// 右后轮
		private phyRBWheel: p2.Body;
		private createCar() {
			let self = this;
			let shape: p2.Shape;
			// 车身
			shape = new p2.Box({ width: 120, height: 300 })
			this.physBody = new p2.Body({ position: [160, 450] });
			this.physBody.addShape(shape);
			this.world.addBody(this.physBody);

			shape = new p2.Box({ width: 22, height: 57 })
			this.phyLFWheel = new p2.Body({ mass: 1, position: [11, 74] });
			this.phyLFWheel.addShape(shape);
			this.world.addBody(this.phyLFWheel);
			// shape = new p2.Box({ width: 22, height: 57 })
			// this.phyRFWheel = new p2.Body({ mass: 1, position: [113, 74] });
			// this.phyRFWheel.addShape(shape);
			// this.world.addBody(this.phyRFWheel);
			// shape = new p2.Box({ width: 22, height: 57 })
			// this.phyLBWheel = new p2.Body({ mass: 1, position: [11, 229] });
			// this.phyLBWheel.addShape(shape);
			// this.world.addBody(this.phyLBWheel);
			// shape = new p2.Box({ width: 22, height: 57 })
			// this.phyRBWheel = new p2.Body({ mass: 1, position: [113, 229] });
			// this.phyRBWheel.addShape(shape);
			// this.world.addBody(this.phyRBWheel);


			let revoluteCon1 = new p2.RevoluteConstraint(this.physBody, this.phyLFWheel, {
				localPivotA: [0, 0],
				localPivotB: [0, 0],
				collideConnected: false,
			})
			this.world.addConstraint(revoluteCon1);


			this.phyLFWheel.velocity = [100, 0];
			this.phyLFWheel.damping = 0;


		}
		private createDebug(): void {
			//创建调试试图
			this.debugDraw = new p2DebugDraw(this.world);
			var sprite: egret.Sprite = new egret.Sprite();
			this.displayListContainer.addChild(sprite);
			this.debugDraw.setSprite(sprite);
		}
		private _time: number;
		private loop() {
			if (!this._time) this._time = egret.getTimer();
			let now = egret.getTimer();
			let passtime = now - this._time;
			this._time = now;
			if (passtime < 10) {
				return;
			}
			if (passtime > 1000) {
				return;
			}

			this.world.step(passtime / 1000);
			this.debugDraw.drawDebug();
			console.log(this.physBody.position[0], this.physBody.position[1], this.phyLFWheel.position[0], this.phyLFWheel.position[1]);
		}
		private addOneBox(e) {

		}
	}
}