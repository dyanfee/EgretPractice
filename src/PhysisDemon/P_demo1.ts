module PhysicsDemo {
	/**
	 * 等比例物理世界demo
	 */
	export class P_demo1 extends MyComponent {
		private world: p2.World;
		private debugDraw: p2DebugDraw;
		private stageHeight: number = egret.lifecycle.stage.stageHeight;
		public constructor() {
			super();
			this.initScreen();
		}
		private initScreen() {
			this.createWorld();
			this.createGround();
			this.createBodies();
			this.createDebug();
			egret.lifecycle.stage.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
			//鼠标点击添加刚体
			egret.lifecycle.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
		}
		private createWorld() {
			this.world = new p2.World();
			this.world.sleepMode = p2.World.BODY_SLEEPING;
			this.world.gravity = [-100, 0];
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
		private createBodies() {
			let box: p2.Shape = new p2.Box({ width: 100, height: 50 });
			let boxBody: p2.Body = new p2.Body({
				mass: 1,
				position: [200, 200],
				angularVelocity: 1
			})
			boxBody.addShape(box);
			this.world.addBody(boxBody);

			let boxShape: p2.Shape = new p2.Box({ width: 50, height: 50 });
			let boxBody2 = new p2.Body({ mass: 1, position: [200, 380], angularVelocity: 1 });
			boxBody2.addShape(boxShape);
			this.world.addBody(boxBody2);
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
			this.debugDraw.drawDebug();
		}
		private types: string[] = ["box", "circle", "capsule", "line", "particle"]
		private addOneBox(e) {
			// let shape: egret.Shape = new egret.Shape();
			// shape.graphics.beginFill(0xff0000);
			// shape.graphics.drawRect(0, 0, 100, 100);
			// shape.graphics.endFill();
			// shape.x = shape.y = 300;
			// this.displayListContainer.addChild(shape);

			var positionX: number = Math.floor(e.stageX);
			var positionY: number = Math.floor(e.stageY);
			var shape: p2.Shape;
			var body = new p2.Body({ gravityScale: 10, mass: 1, position: [positionX, positionY] });
			body.sleep
			var shapeType = this.types[Math.floor((Math.random() * this.types.length))];
			//shapeType = "particle";
			shapeType = "box";
			switch (shapeType) {
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
			this.world.addBody(body);
		}
	}
}