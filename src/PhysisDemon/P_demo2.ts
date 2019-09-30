module PhysicsDemo {
	/**
	 * 转换为物理世界单位--米
	 */
	export class P_demo2 extends MyComponent {
		private world: p2.World;
		private debugDraw: p2DebugDraw;
		private stageHeight: number = egret.lifecycle.stage.stageHeight;
		private factor: number = 30;
		public constructor() {
			super();
			this.initScreen();
		}
		private initScreen() {
			this.createWorld();
			this.createGround();
			// this.createBodies();
			this.createDebug();
			egret.lifecycle.stage.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
			//鼠标点击添加刚体
			egret.lifecycle.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
		}
		private createWorld() {
			this.world = new p2.World();
			this.world.sleepMode = p2.World.BODY_SLEEPING;
			// this.world.gravity = [0, 0];
		}
		private createGround() {
			let shape: p2.Plane = new p2.Plane();
			let body: p2.Body = new p2.Body();
			// body.position[1] = 100;
			body.addShape(shape);
			this.world.addBody(body);
		}
		private createBodies() {
			let rect: fairygui.GComponent = this.createObject("phyRect").asCom;
			rect.setPivot(0.5, 0.5, true);
			let box: p2.Shape = new p2.Box({ width: rect.width / this.factor, height: rect.height / this.factor });
			let boxBody: p2.Body = new p2.Body({
				mass: 1,
				position: [300 / this.factor, (egret.MainContext.instance.stage.stageHeight - 300) / this.factor],
				angularVelocity: 1
			})
			boxBody.addShape(box);
			boxBody.displays = [rect.displayObject];
			this.world.addBody(boxBody);
			this.addChild(rect);
			// let boxShape: p2.Shape = new p2.Box({ width: 2, height: 2 });
			// let boxBody2 = new p2.Body({
			// 	mass: 1,
			// 	position: [400 / this.factor,
			// 	(egret.MainContext.instance.stage.stageHeight - 300) / this.factor],
			// 	angularVelocity: 1
			// });
			// boxBody2.addShape(boxShape);
			// this.world.addBody(boxBody2);
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


			this.world.step(passtime / 1000);
			let stageHeight: number = egret.MainContext.instance.stage.stageHeight;
			let len = this.world.bodies.length;
			for (let i = 0; i < len; i++) {
				let body = this.world.bodies[i];
				let display: fairygui.GObject = body["display"];
				if (display) {
					display.x = body.position[0] * this.factor;
					display.y = stageHeight - body.position[1] * this.factor;
					display.rotation = 360 - (body.angle + body.shapes[0].angle) * 180 / Math.PI;
				}
			}
			this.debugDraw.drawDebug();
		}
		private addOneBox(e) {
			var positionX: number = e.stageX / this.factor;
			var positionY: number = (this.stageHeight - e.stageY) / this.factor;
			var shape: p2.Shape;
			var body = new p2.Body({ mass: 1, position: [positionX, positionY] });
			body.sleep
			var shapeType = Math.random() > 0.5 ? "phyRect" : "phyBall";
			let display: fairygui.GObject = this.createObject(shapeType);
			display.setPivot(0.5, 0.5, true);
			display.x = e.stageX;
			display.y = e.stageY;
			switch (shapeType) {
				case "phyRect":
					shape = new p2.Box({ width: display.width / this.factor, height: display.height / this.factor });
					break;
				case "phyBall":
					shape = new p2.Circle({ radius: display.width * .5 / this.factor });
					break;
				case "box":
					//shape = new p2.Rectangle(Math.random() * 150 + 50, 100);
					shape = new p2.Box({ width: Math.random() * 150 + 50, height: 100 });
					break;
				case "circle":
					//shape = new p2.Circle(50);
					shape = new p2.Circle({ radius: 50 });
					break;
				case "capsule":
					//shape = new p2.Capsule(50, 10);
					shape = new p2.Capsule({ length: 50, radius: 10 });
					break;
				case "line":
					//shape = new p2.Line(150);
					shape = new p2.Line({ length: 150 });
					break;
				case "particle":
					shape = new p2.Particle();
					break;
			}
			body.addShape(shape);
			body["display"] = display;
			this.world.addBody(body);
			this.addChild(display);
		}
	}
}