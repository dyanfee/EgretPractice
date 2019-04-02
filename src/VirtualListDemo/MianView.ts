module VirtualListDemo {
	export interface VirtualData {
		id: number;
		itemName: string;
		desc: string;
		state: number;
	}
	export class MainView extends MyComponent {
		public constructor() {
			super();
		}
		private _virtualData: Array<VirtualData> = [];
		private _list: fairygui.GList;
		private static listData: VirtualData[] = [];
		private _dataLen: number = 14;
		myload() {
			this._list = this.getChild("list").asList;
			this.addListen();
		}
		init() {
			this.parseData();
			this.updataListData();

			this._list.itemRenderer = this.renderItem;

			this._list.setVirtual();
			this._list.numItems = MainView.listData.length;

		}
		private addListen() {
			MyEvent.add("touchAcpt", this.refreshTask, this)
		}
		private removeListen() {
			MyEvent.off("touchAcpt", this.refreshTask, this)
		}
		private parseData() {
			let item = RES.getRes("virtualListDemoData_json");
			for (let key in item) {
				this._virtualData.push({
					id: item[key].id,
					itemName: item[key].condition,
					desc: item[key].describe,
					state: 0
				})
			}

		}

		private renderItem(index: number, item: ListCom) {
			item.setData(MainView.listData[index]);
		}
		// private setListData() {
		// 	for (let i = 0; i < this._dataLen; i++) {
		// 		MainView.listData[i] = this._virtualData[i];
		// 	}
		// 	// console.log(MainView.listData);
		// 	// console.log(this._finishedIdList);

		// }
		private _finishedIdList: number[] = [3, 5, 1, 6];
		private _gottaList: number[] = [];
		private getFinishedList() {
			return this._finishedIdList.sort((a, b) => {
				return a - b
			})
		}
		private refreshTask(taskId: number) {
			let index = 0;
			for (let i = 0; i < MainView.listData.length; i++) {
				let item = MainView.listData[i];
				if (taskId == item.id) {
					index = i;
					this._gottaList.push(taskId);
					this._finishedIdList.splice(this._finishedIdList.indexOf(taskId), 1);
					break;
				}
			}
			console.log("已完成列表：" + this._finishedIdList);
			console.log("已领取列表：" + this._gottaList);

			let item: ListCom = this._list.getChildAt(index) as ListCom;
			// item.changeState();
			this.updataListData();
			this._list.numItems = MainView.listData.length;
		}
		public updataListData() {
			let tempList: VirtualData[] = [];
			for (let i = 0; i < this._dataLen; i++) {
				tempList[i] = this._virtualData[i];
			}
			for (let i = 0; i < tempList.length; i++) {
				if (this.getFinishedList().indexOf(tempList[i].id) != -1) {
					let item = tempList.splice(i, 1)[0];
					item.state = 1;
					tempList.unshift(item);
				}
			}
			for (let i = tempList.length - 1; i >= 0; i--) {
				if (this._gottaList.indexOf(tempList[i].id) != -1) {
					let item = tempList.splice(i, 1)[0];
					item.state = 2;
					tempList.push(item);
				}
			}
			MainView.listData = tempList;
		}

	}


}