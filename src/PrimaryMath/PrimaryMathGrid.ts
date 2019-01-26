class PrimaryMathGrid extends MyComponent {
	public constructor() {
		super();
	}
	private _correctKey: boolean;
	public _control: fairygui.Controller;
	onload() {
		this._control = this.getController("c1");
	}
	public initGrid(num) {
		this._control.selectedIndex = num;
		this._correctKey = false;
		this.addListen();
	}
	public setKey(val) {
		this._correctKey = val;
	}
	private isCorrect() {
		console.log("---------", this._correctKey);

		if (this._correctKey)
			MyEvent.dispach(Data.NEXT_ROUND);
		else
			MyEvent.dispach(Data.ERROR_ANSWER);
	}
	private addListen() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.isCorrect, this);
	}
	private removeListen() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.isCorrect, this);

	}
	release() {
		this.removeListen();
	}
	dispose() {
		this.removeListen();
		super.dispose();
	}
}	