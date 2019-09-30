module PhysicsDemo {
	/**
	 * 平面小车模型
	 */
	export class P_demo3 extends MyComponent {
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
			document.addEventListener("keydown", this.keyDown)
			egret.lifecycle.stage.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
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
		// 左前轮
		private phyLFWheel: p2.WheelConstraint;
		// 右前轮
		private phyRFWheel: p2.WheelConstraint;
		// 左后轮
		private phyLBWheel: p2.WheelConstraint;
		// 右后轮
		private phyRBWheel: p2.WheelConstraint;
		private createCar() {
			let self = this;
			let body = new p2.Body({ mass: 1, position: [160, 450] });
			let shape = new p2.Box({ width: 120, height: 300 });
			body.addShape(shape);
			this.world.addBody(body);
			let vehicle = new p2.TopDownVehicle(body);

			// Add one front wheel and one back wheel - we don't actually need four :)
			// this.phyLFWheel = vehicle.addWheel({
			// 	localPosition: [60, 150], // front
			// 	sideFriction: 4
			// });
			// this.phyLFWheel.collideConnected = false;
			// // Back wheel
			// this.phyLBWheel = vehicle.addWheel({
			// 	localPosition: [0, -0.5], // back
			// 	sideFriction: 3
			// });

			vehicle.addToWorld(this.world);
			// // Steer value zero means straight forward. Positive is left and negative right.
			// this.phyLFWheel.steerValue = Math.PI / 16;

			// // Engine force forward
			// this.phyLBWheel.engineForce = 10;
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
		keyDown(e) {
			// Key controls
			var keys = {
				'37': 0, // left
				'39': 0, // right
				'38': 0, // up
				'40': 0 // down
			};
			var maxSteer = Math.PI / 3;

			// 	// Steer value zero means straight forward. Positive is left and negative right.
			// 	frontWheel.steerValue = maxSteer * (keys[37] - keys[39]);

			// 	// Engine force forward
			// 	backWheel.engineForce = keys[38] * 7;

			// 	backWheel.setBrakeForce(0);
			// 	if (keys[40]) {
			// 		if (backWheel.getSpeed() > 0.1) {
			// 			// Moving forward - add some brake force to slow down
			// 			backWheel.setBrakeForce(5);
			// 		} else {
			// 			// Moving backwards - reverse the engine force
			// 			backWheel.setBrakeForce(0);
			// 			backWheel.engineForce = -2;
			// 		}
			// 	}
			// }
		}
	}
}