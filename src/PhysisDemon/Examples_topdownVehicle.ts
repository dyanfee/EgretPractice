/**
 * topdown vehicle
 * 
 * 结论 p2.TopDownVehicle 缺少api  setSideFriction
 *      p2.WheelConstraint 缺少api setBrakeForce
 * @author 
 *
 */
class topdownVehicle extends fairygui.GComponent {
    private world: p2.World;

    private chassis: p2.Body;//vehicle chassis
    private p2Vehicle: p2.TopDownVehicle;//physics vehicle
    private frontWheel: p2.WheelConstraint;//wheel constrait
    private backWheel: p2.WheelConstraint;//wheel constraintr

    private maxSteer: number = Math.PI / 5;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded2stage, this);
    }

    private onAdded2stage(e: egret.Event): void {
        jbP2.KeyManager.init();
        this.world = new p2.World();
        this.world.gravity = [0, 0];//set 0 gravity
        this.world.sleepMode = p2.World.NO_SLEEPING;
        egret.Ticker.getInstance().register(this.p2RunStep, this);//register update step of p2.wolrd 

        //鼠标拾取工具实例
        // var mouseJt = new P2MouseJointHelper(this.displayListContainer.stage, this.displayListContainer, this.world);

        var tembody: p2.Body;

        tembody = PhysicsDemo.P2Tool.addOneBox(this.world, this.displayListContainer, 0, 240, 10, 480, 0, p2.Body.STATIC);//left wall
        tembody = PhysicsDemo.P2Tool.addOneBox(this.world, this.displayListContainer, 800, 240, 10, 480, 0, p2.Body.STATIC);//right wall    
        tembody = PhysicsDemo.P2Tool.addOneBox(this.world, this.displayListContainer, 400, 0, 800, 40, 0, p2.Body.STATIC);//top static
        tembody = PhysicsDemo.P2Tool.addOneBox(this.world, this.displayListContainer, 400, 480, 800, 40, 0, p2.Body.STATIC);//bottom static


        this.chassis = PhysicsDemo.P2Tool.addOneBox(this.world, this.displayListContainer, 400, 100, 40, 100, 0, p2.Body.DYNAMIC);//chassis body

        // Create the vehicle
        this.p2Vehicle = new p2.TopDownVehicle(this.chassis);

        // Add one front wheel and one back wheel - we don't actually need four :)
        this.frontWheel = this.p2Vehicle.addWheel({
            localPosition: [0, 0.5] // front
        });
        this.frontWheel["setSideFriction"](4);//p2含有的api，Egret没添加


        // Back wheel
        this.backWheel = this.p2Vehicle.addWheel({
            localPosition: [0, -0.5] // back
        });
        this.backWheel["setSideFriction"](3); // Less side friction on back wheel makes it easier to drift

        this.p2Vehicle.addToWorld(this.world);

        this.addEventListener(egret.Event.ENTER_FRAME, this.onef, this)
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

        // this.debugDraw.drawDebug();
    }
    /**
     * 更新p2.World里面所有刚体的皮肤
     */
    public updateWorldBodiesSkin(p2World: p2.World): void {
        var stageHeight: number = egret.MainContext.instance.stage.stageHeight;//显示世界 stageHeight
        var len = p2World.bodies.length;

        for (var i: number = 0; i < len; i++) {//遍历所有的刚体
            var temBody: p2.Body = p2World.bodies[i];
            if (!temBody) return;
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
            skinDisp.x = PhysicsDemo.P2Tool.convertP2ValueToEgret(body.position[0]);//把物理世界的位置转换到显示世界的位置，赋值
            skinDisp.y = PhysicsDemo.P2Tool.convertP2Y_To_EgretY(body.position[1]);//把物理世界的位置转换到显示世界的位置，赋值
            skinDisp.rotation = PhysicsDemo.P2Tool.convertP2BodyAngleToEgret(body);//把物理世界刚体角度转换为显示世界角度，赋值
        }
    }
    private onef(e: egret.Event): void {
        this.updateKeyCtrl();
    }

    private updateKeyCtrl(): void {
        // Steer value zero means straight forward. Positive is left and negative right.
        var steerValue = 0;
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)) {
            steerValue = 1;
        } else if (jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)) {
            steerValue = -1;
        } else {
            steerValue = 0;
        }
        this.frontWheel.steerValue = this.maxSteer * steerValue;


        // Engine force forward
        var engineForce: number = 0;
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.UP)) {
            engineForce = 1;
        } else {
            engineForce = 0;
        }
        this.backWheel.engineForce = engineForce * 7;


        this.backWheel["setBrakeForce"](0);
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.DOWN)) {
            if (this.backWheel.getSpeed() > 0.1) {
                // Moving forward - add some brake force to slow down
                this.backWheel["setBrakeForce"](5);
            } else {
                // Moving backwards - reverse the engine force
                this.backWheel["setBrakeForce"](0);
                this.backWheel.engineForce = -2;
            }
        }
    }
}
