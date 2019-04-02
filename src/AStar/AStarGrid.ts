module AstarPra {
	export class Grid extends MyComponent {
		public constructor() {
			super();
		}
		private _row: number;
		private _col: number;
		private _control: fairygui.Controller;
		myload() {
			let self = this;
			self._control = self.getControllerAt(0);
			this.addListen();
		}

		public set row(row: number) {
			this._row = row;
		}
		public set col(col: number) {
			this._col = col;
		}

		public set control(index) {
			this._control.selectedIndex = index;
		}
		private addListen() {
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touch, this);
		}

		private removeListen() {
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touch, this);
		}

		private touch(e) {
			MyEvent.dispach(Data.TOUCH_GRID, { "row": this._row, "col": this._col });
			// console.log("row col", this._row, this._col);
		}
	}
}