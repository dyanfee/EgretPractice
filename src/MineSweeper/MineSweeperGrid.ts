class MineSweeperGrid extends MyComponent {
	public constructor() {
		super();
	}
	onload() {
		this.touchable = false;
	}
	public _touch: boolean = true;
	private _row: number;
	private _col: number;
	public setPosition(row, col) {
		this._row = row;
		this._col = col;
	}
	public disappear() {
		this.getTransition("disappear").play(() => {
			this.removeFromParent();
		})
	}
	public get row(): number {
		return this._row;
	}
	public get col(): number {
		return this._col;
	}
}