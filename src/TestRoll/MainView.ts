module TextRoll {
	export class MainView extends MyComponent {
		public constructor() {
			super();
		}
		private _list: fairygui.GList;
		myload() {
			this._list = this.getChild("roll").asCom.getChildAt(0).asList;
			setInterval(() => {
				this.rollToValue(Math.floor(Math.random() * 100000))
				// this.rollToValue(((Math.floor(Math.random() * 10).toString() as any).repeat(3)))
			}, 1000)
		}

		public initInfo() {

		}

		public rollToValue(val) {
			let text = `${val}`;
			let len = text.length;

			if (this._list.numItems != len) {
				this._list.numItems = len;
			}
			for (let i = 0; i < len; i++) {
				(this._list.getChildAt(i) as RollItem).setItemData(text[i]);
			}
		}



	}
	export class RollItem extends MyComponent {
		private _list: fairygui.GList;
		myload() {

			this._list = this.getChildAt(0).asList;
			this._list.itemRenderer = this.itemRender;
			this._list.setVirtualAndLoop();

			this._list.numItems = 10;
		}

		itemRender(index, item: fairygui.GComponent) {
			item.getChildAt(0).asTextField.text = `${index}`;
		}
		private __ = 0;
		setItemData(num) {
			num = parseInt(num);
			// let ratio;
			// if (num > this.__) {
			// 	ratio = num - this.__;
			// } else {
			// 	ratio = num + this.__;
			// }
			// this.__ = num;
			// this._list.scrollPane.scrollDown(ratio, true);
			this._list.scrollToView(num, true);
			// this._list.numItems = 10;
		}
	}
}