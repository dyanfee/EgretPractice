module PhysicsDemo {
	export class P2Tool {
		public static factor: number = 30;

		public static get stageHeight() {
			return egret.lifecycle.stage.stageHeight;
		};
		/**
		 * 获得p2Body的egret显示旋转角度
		 */
		public static convertP2BodyAngleToEgret(body: p2.Body): number {
			var result: number;
			result = 360 - body.angle * 180 / Math.PI;
			return result;
		}

		/**
		 * 把egret角度转换为p2角度
		 */
		public static convertEgretAngleToP2(angle: number): number {
			var result: number;
			result = (360 - angle) * Math.PI / 180;
			return result;
		}

		/**
		 * 物理世界的长度标量到显示世界的转换
		 * 适合如 x,width,height的转换，y值不适合
		 */
		public static convertP2ValueToEgret(value: number): number {
			return value * this.factor;
		}

		/**
		 * 显示世界物理世界的长度标量到物理世界的转换
		 * 适合如 x,width,height的转换，y值不适合
		 */
		public static convertEgretValueToP2(value: number): number {
			return value / this.factor;
		}

		/**
		 * 把egretY值转换到p2Y值，仅适合y转换
		 */
		public static convertEgretY_To_P2Y(egretY: number): number {
			return (this.stageHeight - egretY) / this.factor;
		}


		/**
		 * 把p2y值转换到egretY值，仅适合y转换
		 */
		public static convertP2Y_To_EgretY(p2Y: number): number {
			return this.stageHeight - p2Y * this.factor;
		}
		/**
		* 在物理世界创建一个矩形刚体，显示cube矢量图形
		*/
		public static addOneBox(p2World: p2.World, ctn: egret.DisplayObjectContainer, px: number, py: number, pw: number, ph: number, pAngle: number, type: number): p2.Body {

			//在物理世界中的位置
			var p2x: number = this.convertEgretValueToP2(px);//显示位置变换到物理世界位置
			var p2y: number = this.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
			var p2Wid: number = this.convertEgretValueToP2(pw);
			var p2Hei: number = this.convertEgretValueToP2(ph);
			var p2Angle: number = this.convertEgretAngleToP2(pAngle);

			var display: egret.DisplayObject;

			var bodyShape: p2.Shape = new p2.Box({ width: p2Wid, height: p2Hei }); //new p2.Rectangle(p2Wid, p2Hei);
			var body: p2.Body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
			body.type = type;
			body.addShape(bodyShape);//给刚体添加p2.Shape
			p2World.addBody(body);

			display = P2Tool.createBoxSkin(pw, ph);

			//绑定刚体和显示皮肤
			body.displays = [display];
			ctn.addChild(display);//把皮肤添加到显示世界

			return body;
		}
		/**
		* 创建一个方形皮肤
		* 返回的图形锚点位于图形中心
		*/
		public static createBoxSkin(width: number, height: number): egret.Shape {
			console.log("createBoxSkin " + width + "," + height);
			var shape = new egret.Shape();
			shape.graphics.lineStyle(1, 0);
			shape.graphics.beginFill(0xfff000);
			shape.graphics.drawRect(0, 0, width, height);
			shape.graphics.endFill();
			//将显示对象的锚点移到中心位置
			shape.anchorOffsetX = shape.width / 2;
			shape.anchorOffsetY = shape.height / 2;
			return shape;
		}

		public static createBox(p2World: p2.World, ctn: fairygui.GComponent, px: number, py: number, pw: number, ph: number, pAngle: number, type: number): p2.Body {
			//在物理世界中的位置
			var p2x: number = this.convertEgretValueToP2(px);//显示位置变换到物理世界位置
			var p2y: number = this.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
			var p2Wid: number = this.convertEgretValueToP2(pw);
			var p2Hei: number = this.convertEgretValueToP2(ph);
			var p2Angle: number = this.convertEgretAngleToP2(pAngle);

			var display: egret.DisplayObject;
			var bodyShape: p2.Shape = new p2.Box({ width: p2Wid, height: p2Hei }); //new p2.Rectangle(p2Wid, p2Hei);
			var body: p2.Body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
			body.type = type;
			body.addShape(bodyShape);//给刚体添加p2.Shape
			p2World.addBody(body);

			display = P2Tool.createBoxSkin(pw, ph);

			body["display"] = display;
			ctn.displayListContainer.addChild(display);//把皮肤添加到显示世界

			return body;
		}
	}
}