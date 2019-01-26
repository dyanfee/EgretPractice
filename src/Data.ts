class Data {
	static pkgName: string = "practiceUI";
	// 获取屏幕宽度
	static get getWidth() {
		return egret.lifecycle.stage.stageWidth;
	}
	// 获取屏幕高度
	static get getHeight() {
		return egret.lifecycle.stage.stageHeight;
	}


	//-----EVENT------//
	static NEXT_ROUND: string = "next_round";
	static ERROR_ANSWER:string = "error_answer";
}