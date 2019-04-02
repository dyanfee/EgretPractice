class SwitchColorGrid extends MyComponent {
	private _isKey: boolean;
	public constructor() {
		super();
	}
	myload() {
		this._isKey = false;
	}
	public set isKey(val) {
		this._isKey = val;
	}
	public addListen() {
		if (this._isKey) {
			this.touchable = true;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next, this);
		}
	}
	private next(evt: egret.TouchEvent) {
		MyEvent.dispach(Data.NEXT_ROUND);
	}
	dispose() {
		super.dispose();
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.next, this);
	}
}