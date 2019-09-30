class TestP2RevoluteConstraint extends egret.Sprite {
	//物理世界
	public world: p2.World;

	//物理世界转换系数
	public factor: number = 50;

	//物理世界Rect
	public worldRect: egret.Rectangle;

	//disp container
	public dispCtn: egret.Sprite;

	private box1: p2.Body;//约束目标刚体1
	private box2: p2.Body;//约束目标刚体2

	private pvtJt: p2.RevoluteConstraint;//约束

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded2stage, this);
	}

	private onAdded2stage(e: egret.Event): void {
		this.setup();
	}

	//setup
	public setup() {
		this.dispCtn = new egret.Sprite();
		this.addChild(this.dispCtn);

		//初始化P2Space
		this.worldRect = new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight);

		//创建world
		this.world = new p2.World();

		//set p2.world.sleepMode
		this.world.sleepMode = p2.World.BODY_SLEEPING;

		egret.Ticker.getInstance().register(this.p2RunStep, this);//register update step of p2.wolrd 

		//p2 scene setup----------------------
		this.createSceneObjs();

		this.createDebug();
	}

    /**
     * 创建场景物体
     */
	private createSceneObjs(): void {
		this.box1 = this.addOneBox(this.world, this.dispCtn, 400, 100, 50, 50, 0, p2.Body.DYNAMIC);//box1
		this.box2 = this.addOneBox(this.world, this.dispCtn, 600, 100, 50, 50, 0, p2.Body.DYNAMIC);//box2

		this.addOneBox(this.world, this.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC);//left wall
		this.addOneBox(this.world, this.dispCtn, 720, 240, 10, 480, 0, p2.Body.STATIC);//right wall
		this.addOneBox(this.world, this.dispCtn, 360, 400, 800, 20, 0, p2.Body.STATIC);//bottom wall


		//约束点放在两个刚体中间位置,转换到p2空间点坐标
		var pivotP2X: number = this.convertEgretValueToP2(450);
		var pivotP2Y: number = this.convertEgretY_To_P2Y(100);

		//构造方法中type的值可以是Constraint.DISTANCE, Constraint.GEAR, Constraint.LOCK, Constraint.PRISMATIC or Constraint.REVOLUTE
		//this.pvtJt = new p2.RevoluteConstraint(this.box1, this.box2,p2.Constraint.REVOLUTE, {worldPivot: [pivotP2X, pivotP2Y]});
		this.pvtJt = new p2.RevoluteConstraint(this.box1, this.box2, { worldPivot: [pivotP2X, pivotP2Y] });     //2015/10/14 新构造方法中变化                   
		this.world.addConstraint(this.pvtJt);
	}

	//update step
	protected p2RunStep(dt) {
		if (dt < 10) {
			return;
		}
		if (dt > 1000) {
			return;
		}
		console.log((dt / 1000));
		
		this.world.step(dt / 1000);//p2.World.step                                 
		this.updateWorldBodiesSkin(this.world);//更新p2World内所有刚体皮肤显示

		this.debugDraw.drawDebug();
	}
	private debugDraw;
	private createDebug(): void {
		//创建调试试图
		this.debugDraw = new p2DebugDraw(this.world);
		var sprite: egret.Sprite = new egret.Sprite();
		this.addChild(sprite);
		this.debugDraw.setSprite(sprite);
	}
    /**
     * 更新p2.World里面所有刚体的皮肤
     */
	public updateWorldBodiesSkin(p2World: p2.World): void {
		var stageHeight: number = egret.MainContext.instance.stage.stageHeight;//显示世界 stageHeight
		var len = p2World.bodies.length;

		for (var i: number = 0; i < len; i++) {//遍历所有的刚体
			var temBody: p2.Body = p2World.bodies[i];
			this.updateBodySkin(temBody);

			var dispSkin: egret.DisplayObject = temBody.displays[0];
			if (dispSkin) {//同步物理世界中物体位置和旋转状态到显示列
				if (temBody.sleepState == p2.Body.SLEEPING) {//设置是否睡眠状态显示
					dispSkin.alpha = 0.5;
				} else {
					dispSkin.alpha = 1;
				}
			}//endif
		}//end for
	}

    /**
     * 更新目标刚体的皮肤
     */
	public updateBodySkin(body: p2.Body): void {
		var skinDisp: egret.DisplayObject = body.displays[0];
		if (skinDisp) {
			skinDisp.x = this.convertP2ValueToEgret(body.position[0]);//把物理世界的位置转换到显示世界的位置，赋值
			skinDisp.y = this.convertP2Y_To_EgretY(body.position[1]);//把物理世界的位置转换到显示世界的位置，赋值
			skinDisp.rotation = this.convertP2BodyAngleToEgret(body);//把物理世界刚体角度转换为显示世界角度，赋值
		}
	}

    /**
    * 获得p2Body的egret显示旋转角度
    */
	public convertP2BodyAngleToEgret(body: p2.Body): number {
		var result: number;
		result = 360 - body.angle * 180 / Math.PI;
		return result;
	}

    /**
    * 把egret角度转换为p2角度
    */
	public convertEgretAngleToP2(angle: number): number {
		var result: number;
		result = (360 - angle) * Math.PI / 180;
		return result;
	}

    /**
    * 物理世界的长度标量到显示世界的转换
    * 适合如 x,width,height的转换，y值不适合
    */
	public convertP2ValueToEgret(value: number): number {
		return value * this.factor;
	}

    /**
    * 显示世界物理世界的长度标量到物理世界的转换
    * 适合如 x,width,height的转换，y值不适合
    */
	public convertEgretValueToP2(value: number): number {
		return value / this.factor;
	}

    /**
    * 把egretY值转换到p2Y值，仅适合y转换
    */
	public convertEgretY_To_P2Y(egretY: number): number {
		return (this.worldRect.height - egretY) / this.factor;
	}


    /**
    * 把p2y值转换到egretY值，仅适合y转换
    */
	public convertP2Y_To_EgretY(p2Y: number): number {
		return this.worldRect.height - p2Y * this.factor;
	}

    /**
    * 在物理世界创建一个矩形刚体，显示cube矢量图形
    */
	public addOneBox(p2World: p2.World, ctn: egret.DisplayObjectContainer, px: number, py: number, pw: number, ph: number, pAngle: number, type: number): p2.Body {

		//在物理世界中的位置
		var p2x: number = this.convertEgretValueToP2(px);//显示位置变换到物理世界位置
		var p2y: number = this.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
		var p2Wid: number = this.convertEgretValueToP2(pw);
		var p2Hei: number = this.convertEgretValueToP2(ph);
		var p2Angle: number = this.convertEgretAngleToP2(pAngle);

		var display: egret.DisplayObject;

		var bodyShape: p2.Shape = new p2.Box({ width: p2Wid, height: p2Hei });
		var body: p2.Body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
		body.type = type;
		body.addShape(bodyShape);//给刚体添加p2.Shape
		p2World.addBody(body);

		display = this.createBoxSkin(pw, ph);

		//绑定刚体和显示皮肤
		body.displays = [display];
		ctn.addChild(display);//把皮肤添加到显示世界

		return body;
	}

    /**
    * 创建一个方形皮肤
    * 返回的图形锚点位于图形中心
    */
	public createBoxSkin(width: number, height: number): egret.Shape {
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
}