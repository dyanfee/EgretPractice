module PracticePro {
	export class SeachMap extends MyComponent {
		public constructor() {
			super();
		}
		private _re: fairygui.GButton;
		private _start: fairygui.GButton;
		onload() {
			this._re = this.getChild("re").asButton;
			this._start = this.getChild("start").asButton;
			this.initUi();
			this.addListen();
		}
		public gridList: Grid[][];
		private initUi() {
			this.gridList = [];
			for (let i = 0; i < Data.MAX_ROW; i++) {
				this.gridList[i] = [];
				for (let j = 0; j < Data.MAX_COL; j++) {
					let item = this.createObject("translucenceGrid") as Grid;
					this.gridList[i][j] = item;
					item.x = 20 + (item.width + 2) * j;
					item.y = 300 + (item.height + 2) * i;
					item.row = i;
					item.col = j;
					this.addChild(item);
				}
			}
			setTimeout(() => {
				this.createMap();
			}, 300);
		}
		private addListen() {
			this._re.addClickListener(this.re, this);
			this._start.addClickListener(this.start, this);
			MyEvent.add(Data.TOUCH_GRID, this.touch, this);
		}
		private removeListen() {
			this._re.removeClickListener(this.re, this);
			this._start.removeClickListener(this.start, this);
			MyEvent.off(Data.TOUCH_GRID, this.touch, this);
		}
		private re() {
			let self = this;
			for (let i = 0; i < Data.MAX_ROW; i++) {
				for (let j = 0; j < Data.MAX_COL; j++) {
					AStarModel.instance.setWalkable(i, j, true);
					self.gridList[i][j].control = 0;
				}
			}
			AStarModel.instance.reSetNode();
			this.startGrid = null;
			this.endGrid = null;
			this.createMap();
		}
		private start() {
			let self = this;
			let time = egret.getTimer();
			if (!AStarModel.instance.getStartNode) return;
			// 启动路径搜索
			AStarModel.instance.startAStar();
			console.log("费时：", (egret.getTimer() - time) / 1000 + "s");


			if (!AStarModel.instance.path) return;
			// 绘制路径地图
			let len = AStarModel.instance.path.length;


			for (let i = 0; i < len; i++) {
				setTimeout(() => {

					let row = AStarModel.instance.path[i].row;
					let col = AStarModel.instance.path[i].col;
					self.gridList[row][col].control = 3;
					if (i == 0) self.gridList[row][col].control = 1;
					if (i == len - 1) self.gridList[row][col].control = 2;
				}, i * 100);
			}
		}

		private _obstacle = 0.3;
		// 创建 地图 手动
		private createMap() {
			let self = this;
			for (let i = 0; i < Data.MAX_ROW; i++) {
				for (let j = 0; j < Data.MAX_COL; j++) {
					let res = Math.random() < this._obstacle ? false : true;
					if (!res) {
						AStarModel.instance.setWalkable(i, j, false);
						self.gridList[i][j].control = 4;
					}
				}
			}

			// AStarModel.instance.loadMap(this);

		}
		private startGrid: Grid;
		private endGrid: Grid;
		private touch(data) {

			let self = this;
			let row = data.row;
			let col = data.col;
			if (!AStarModel.instance.getWalkable(row, col)) return;
			if (Data.touchNum == 0) {
				if (self.startGrid)
					this.startGrid.control = 0;
				// 设置起点
				AStarModel.instance.setStartNode(row, col);
				self.gridList[row][col].control = 1;
				self.startGrid = self.gridList[row][col];
				Data.touchNum = 1;
			} else {
				if (self.endGrid)
					this.endGrid.control = 0;
				// 设置终点
				AStarModel.instance.setEndNode(row, col);
				self.gridList[row][col].control = 2;
				self.endGrid = self.gridList[row][col];
				Data.touchNum = 0;
			}
		}
	}
}