module VirtualListDemo {
	export class ListCom extends MyComponent {
		public constructor() {
			super();
		}
		private _taskId: number;
		private _itemName: fairygui.GTextField;
		private _itemDesc: fairygui.GTextField;
		private _btnAcpt: fairygui.GButton;
		myload() {
			this._itemName = this.getChild("itemName").asTextField;
			this._itemDesc = this.getChild("itemDesc").asTextField;
			this._btnAcpt = this.getChild("acptBtn").asButton;
			this._btnAcpt.addClickListener(this.acept, this);
		}
		public setData(data: VirtualData) {
			this._itemName.text = data.itemName;
			this._itemDesc.text = data.desc;
			this._taskId = data.id;
			// this._btnAcpt.enabled = true;
			this._btnAcpt.enabled = true;
			if (data.state == 0) {
				this._btnAcpt.enabled = false;
				this._btnAcpt.selected = false;
			} else if (data.state == 1) {
				this._btnAcpt.selected = false;
			} else {
				this._btnAcpt.touchable = false;
				this._btnAcpt.selected = true;
			}

		}
		private acept() {
			MyEvent.dispach("touchAcpt", this._taskId);
		}
		public changeState() {
			this._btnAcpt.selected = true;
			this._btnAcpt.touchable = false;
			this._btnAcpt.enabled = true;
		}
	}
}