class MineSweeperModel {
	private static _inst: MineSweeperModel;
	public static get instance(): MineSweeperModel {
		return this._inst || (this._inst = new MineSweeperModel);
	}
	public constructor() {
	}
	private logicMap: number[][];
	private _mapRow: number;
	private _mapCol: number;
	private _searchArr: number[][];
	private _updateList: number[][];
	private _isFirstTouch: number = 1;
	init(row, col, mine) {
		this.logicMap = []
		this._searchArr = [];
		this._isFirstTouch = 1;
		for (let i = 0; i < row; i++) {
			this.logicMap[i] = [];
			this._searchArr[i] = [];
			for (let j = 0; j < col; j++) {
				this.logicMap[i][j] = MineEnum.Empty;
				this._searchArr[i][j] = MineEnum.Empty;
			}
		}
		this._mapRow = row;
		this._mapCol = col;
		this.createMine(mine);
	}
	private createMine(num: number) {
		let row, col;
		while (num > 0) {
			row = Math.floor(Math.random() * this._mapRow);
			col = Math.floor(Math.random() * this._mapCol);
			if (this.logicMap[row][col] == 0) {
				this.logicMap[row][col] = MineEnum.Mine;
				num--;
			}
		}
		// console.log(this.logicMap);
	}
	public kaiGua() {
		for (let i = 0; i < this._mapRow; i++) {
			for (let j = 0; j < this._mapCol; j++) {
				if (this.logicMap[i][j] != MineEnum.Mine) {
					this.openMine(i, j);
				}
			}
		}
	}
	public openMine(row, col) {
		if (this._isFirstTouch != 0) { // 如果是第一回合 则避开地雷
			this._isFirstTouch--;
			if (this.logicMap[row][col] == MineEnum.Mine) {
				this.createMine(1);
				this.logicMap[row][col] = MineEnum.Empty;
			}
		}
		if (this.logicMap[row][col] == MineEnum.Mine) {
			console.log("GameOver!");
			MyEvent.dispach(MineDate.GAME_OVER, { row, col, "boom": true })
			this.logicMap[row][col] = MineEnum.Empty;
			this.openMinePosition();
		} else {
			let mineNum = this.findMineCount(row, col);
			if (mineNum == 0) {
				this._updateList = []
				let start = egret.getTimer();
				this.expandMap(row, col);
				MyEvent.dispach(MineDate.MAP_UPDATE, this._updateList)
				let stop = egret.getTimer();
				console.log("耗时：" + (stop - start))
				// console.log(this._searchArr);
			} else {
				MyEvent.dispach(MineDate.MAP_UPDATE, [[row, col, mineNum]])
			}
		}
	}
	//  显示所有地雷
	private openMinePosition() {
		for (let i = 0; i < this._mapRow; i++) {
			for (let j = 0; j < this._mapCol; j++) {
				if (this.logicMap[i][j] == MineEnum.Mine) {
					MyEvent.dispach(MineDate.GAME_OVER, { "row": i, "col": j })
				}
			}
		}
	}
	// 自动展开空位置
	private expandMap(row, col) {
		if (this._searchArr[row][col]) return;
		this._searchArr[row][col] = 1;
		this._updateList.push([row, col, 0]);
		let mineNum: number = 0;
		if (this.logicMap[row][col] == MineEnum.Mine) return;
		// MyEvent.dispach(MineDate.MAP_UPDATE, { row, col }) // 发送地图更新消息
		for (let i = row - 1; i <= row + 1; i++) {
			for (let j = col - 1; j <= col + 1; j++) {
				if (i == row && j == col) continue;
				if (i >= this._mapRow || i < 0 || j >= this._mapCol || j < 0) continue;
				mineNum = this.findMineCount(i, j);
				if (mineNum == 0) {
					this.expandMap(i, j);
				} else {
					if (this._searchArr[i][j]) continue;
					this._searchArr[i][j] = 1;
					// MyEvent.dispach(MineDate.MAP_UPDATE, { "row": i, "col": j, mineNum }) //发送地图更新消息
					this._updateList.push([i, j, mineNum]);
				}
			}
		}

	}
	// 返回目标周围雷数
	private findMineCount(row, col): number {
		let count: number = 0;
		for (let i = row - 1; i <= row + 1; i++) {
			for (let j = col - 1; j <= col + 1; j++) {
				if (i == row && j == col) continue;
				if (i > this._mapRow - 1 || i < 0 || j > this._mapCol - 1 || j < 0) continue;
				if (this.logicMap[i][j] == MineEnum.Mine) count++;
			}
		}
		return count;
	}
	private findMineMap(row, col) {

		MyEvent.dispach(MineDate.MAP_UPDATE);
	}
}
class MineDate {
	public static MAP_UPDATE: string = "mapUpdate";
	public static GAME_OVER: string = "game_over";
}

