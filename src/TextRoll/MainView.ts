module TextRoll {
	export class MainView extends MyComponent {
		public constructor() {
			super();
		}
		private _list: fairygui.GList;
		myload() {
			this._list = this.getChild("roll").asList;
		}

		public initInfo() {

		}

		public rollToValue(val) {
			let text = `${val}`;
			let len = text.length;
			if (this._list.numItems < len) {
				this._list.numItems = len;
			}
			for (let i = 0; i < len; i++) {

			}
		}

	}
	export class RollItem extends MyComponent {
		private _list: fairygui.GList;
		myload() {
			this._list = this.getChildAt(0).asList;
			this._list.setVirtualAndLoop();
		}

		setItemData(num) {
			// this._list.scrollToView()
		}
	}
}