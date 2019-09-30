module FollowDemo {
	export class MainView extends MyComponent {
		public constructor() {
			super();
			this.test3();
		}

		private test3() {
			let data = [1, 3, 10, -247, -1];
			console.log("orgin:", data);
			let dataStr = CompressTool.setListValue1(data);
			console.log("dataStr:", dataStr);
			let listData = CompressTool.getListValue1(dataStr);
			console.log("listData:", listData);
		}
	}
}


