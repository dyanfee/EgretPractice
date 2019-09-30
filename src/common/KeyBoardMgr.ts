class KeyBoardMgr {
	public static UP: number = 38;
	public static DOWN: number = 40;
	public static LEFT: number = 37;
	public static RIGHT: number = 39;

	public static W: number = 87;
	public static S: number = 83;
	public static A: number = 65;
	public static D: number = 68;

	private static _inst: KeyBoardMgr;
	public static get instance(): KeyBoardMgr {
		if (!this._inst) {
			this._inst = new KeyBoardMgr();
			this._inst.addListen();
		}
		return this._inst;
	}
	private addListen() {
		document.addEventListener("keydown", this.keyDown.bind(this))
		document.addEventListener("keyup", this.keyUp.bind(this))

	}
	private keys: Object = {};
	private keyDown(e) {
		this.keys[e.keyCode] = 1;
	}
	private keyUp(e) {
		this.keys[e.keyCode] = 0;
	}
	public static isDown(keyCode: number) {
		if (KeyBoardMgr.instance.keys[keyCode] && KeyBoardMgr.instance.keys[keyCode] == 1)
			return 1;
		return 0;
	}
}