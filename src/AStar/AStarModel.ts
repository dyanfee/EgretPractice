module PracticePro {
	/**
	 * A* 寻路
	 */
	export class AStarModel {
		private static _inst: AStarModel;
		public static get instance(): AStarModel {
			return this._inst || (this._inst = new AStarModel);
		}
		public constructor() {
			this.init();
		}

		private _map: SeachMap;
		public loadMap(map) {
			this._map = map;
		}


		private _open: Array<any>;              // 开启列表
		private _close: any[];					// 关闭列表
		private _path: any[];					// 保存找到路径
		private _straightCost: number = 10;		// 直行耗费
		private _diagCost: number = 14;			// 斜行耗费
		private _nodes: Node[][];				// node 列表
		private _startNode: Node;				// 起点
		private _endNode: Node;					// 终点
		// H 值计算方法 曼哈顿距离 欧式距离
		private _heuristic: Function;
		public setStartNode(x, y) {
			if (this._startNode) {

			}
			this._startNode = this._nodes[x][y];
			this._startNode.g = 0;
			this._startNode.h = this._heuristic(this._startNode);
			this._startNode.f = this._startNode.g + this._startNode.h;
		}
		public setEndNode(x, y) {
			this._endNode = this._nodes[x][y];
		}
		public setWalkable(x, y, e: boolean) {
			this._nodes[x][y].walkable = e;
		}
		public getWalkable(x, y) {
			return this._nodes[x][y].walkable;
		}
		public get getStartNode() {
			return this._startNode;
		}
		public get getEndNode() {
			return this._endNode;
		}
		public reSetNode() {
			this._startNode = null;
			this._endNode = null;
			this._path = [];
			this.init();

		}
		// 初始化节点
		private init() {
			console.log("init Astar");
			this._nodes = [];
			this._open = [];
			this._close = [];
			for (let i = 0; i < Data.MAX_ROW; i++) {
				this._nodes[i] = [];
				for (let j = 0; j < Data.MAX_COL; j++) {
					this._nodes[i][j] = new Node(i, j);
				}
			}

			this._heuristic = this.manhattan;
		}

		public startAStar() {
			let node = this._startNode;
			let k = 0;
			while (node != this._endNode) {
				// let startX = Math.max(0, node.row - 1);
				// let endX = Math.min(node.row + 1, Data.MAX_ROW-1);
				// let startY = Math.max(0, node.col - 1);
				// let endY = Math.min(node.col + 1, Data.MAX_COL-1);
				// for (let i = startX; i <= endX; i++) {
				// 	for (let j = startY; j <= endY; j++) {

				for (let i = node.row - 1; i <= node.row + 1; i++) {
					for (let j = node.col - 1; j <= node.col + 1; j++) {
						if (i == node.row && j == node.col) continue;
						if (i > Data.MAX_ROW - 1 || i < 0 || j > Data.MAX_COL - 1 || j < 0) continue;
						// 不可以斜行
						if (i != node.row && j != node.col) continue;


						let target = this._nodes[i][j];
						if (!target.walkable) continue;
						// 不可行走
						// if (!target.walkable ||
						// 	!this._nodes[node.row][target.col] ||
						// 	!this._nodes[target.row][node.col])
						// 	continue;
						// this._map.gridList[node.row][node.col].control = 6;
						this._map.gridList[i][j].control = 5;



						let cost = this._straightCost;
						// 如果允许斜行 花费变化
						if (!(target.row == node.row || target.col == node.col))
							cost = this._diagCost;

						let g = node.g + cost;
						let h = this._heuristic(target);
						let f = g + h;
						// 如果
						if (this.isOpen(target) || this.isClose(target)) {

							if (target.f > f) {
								target.f = f;
								target.g = g;
								target.h = h;
								target.parent = node;
							}
						} else {
							target.f = f;
							target.g = g;
							target.h = h;
							target.parent = node;
							this._open.push(target);
						}
						if (!this.isClose(node))
							this._close.push(node);
						// console.log("close", this._close);
						// console.log("open", this._open)
						// 所有节点搜索完都没有找到终点 结束
						if (this._open.length == 0) {
							console.log("没有路径可以到达终点！");
							return false;
						}
						// 对open查找f最小
						let openLen = this._open.length;
						for (let m = 0; m < openLen; m++) {
							for (let n = m + 1; n < openLen; n++) {
								if (this._open[m].f > this._open[n].f) {
									let temp = this._open[m];
									this._open[m] = this._open[n];
									this._open[n] = temp;
								}
							}
						}

					}
				}
				node = this._open.shift() as Node;
			}
			this.buildPath();
			return true;
		}

		private buildPath() {
			this._path = [];
			let node: Node = this._endNode;
			this._path.push(node);
			while (node != this._startNode) {
				node = node.parent;
				this._path.unshift(node)		// 将节点放到第一位
			}
		}

		public get path() {
			return this._path;
		}

		private isOpen(node) {
			let len = this._open.length;

			// 优化查找数组中元素方案
			if (this._open.indexOf(node) > -1) return true;
			return false;
		}

		private isClose(node) {
			let len = this._close.length;

			// 优化查找数组中元素方案
			if (this._close.indexOf(node) > -1) return true;
			return false;
		}

		// 曼哈顿距离
		private manhattan(node: Node) {
			return ((Data.MAX_ROW - node.row) + (Data.MAX_COL - node.col)) * this._straightCost;
		}
	}
}
