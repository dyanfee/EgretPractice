class MineSweeper extends MyComponent {
	public constructor() {
		super();
	}
	private _maxRow: number = 20;
	private _maxCol: number = 20;
	private _mineNum: number = 10;
	private _mapList: any[][];
	private _board: fairygui.GComponent;
	private _gridSize: number = 35;
	private _mineNumText: fairygui.GTextField;
	private _timeText: fairygui.GTextField;
	private _timeId: number;
	private _time: number;
	private _re: fairygui.GButton;
	public init() {
		MineSweeperModel.instance.init(this._maxRow, this._maxCol, this._mineNum);
		this._board = this.getChild("board").asCom;
		this._mineNumText = this.getChild("mine").asTextField;
		this._mineNumText.text = this._mineNum + "";
		this._timeText = this.getChild("time").asTextField;
		this._re = this.getChild("re").asButton;
		this.createMap();
		this.startTimer();
		this.addListen();
	}
	private startTimer() {
		this._timeId && clearInterval(this._timeId);
		this._time = 0;
		this._timeText.text = 0 + "";
		this._timeId = setInterval(() => {
			this._timeText.text = (--this._time) + "";
		}, 1000);
	}
	private addListen() {
		this._board.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchGrid, this);
		MyEvent.add(MineDate.MAP_UPDATE, this.mapUpdate, this);
		MyEvent.add(MineDate.GAME_OVER, this.gameOver, this);
		this._re.addClickListener(this.reStart, this);
	}
	private removeListen() {
		this._board.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchGrid, this);
		MyEvent.off(MineDate.MAP_UPDATE, this.mapUpdate, this);
		MyEvent.off(MineDate.GAME_OVER, this.gameOver, this);
	}
	private createMap() {
		this._mapList = [];
		for (let i = 0; i < this._maxRow; i++) {
			this._mapList[i] = [];
			for (let j = 0; j < this._maxCol; j++) {
				let item = this.createObject("MineSweeperGrid") as MineSweeperGrid;
				item.x = 10 + 35 * j;
				item.y = 350 + 35 * i;
				item.setPosition(i, j);
				this.addChild(item);
				this._mapList[i][j] = item;
			}
		}
	}
	private touchGrid(evt: egret.TouchEvent) {
		// console.log(evt.stageX, evt.stageY);
		let row = Math.floor((evt.stageY - 350) / this._gridSize);
		let col = Math.floor((evt.stageX - 10) / this._gridSize);
		// console.log(row, col);
		if (!this._mapList[row][col] ||
			!this._mapList[row][col]._touch) return;
		MineSweeperModel.instance.openMine(row, col);
	}
	private mapUpdate(data) {
		console.log(data);    // 导致延迟严重
		// var st = "";
		// data.forEach(element => {
		// 	st += element.toString()+"___";
		// });
		// console.log(st);

		let len = data.length;
		for (let i = 0; i < len; i++) {
			let row = data[i][0], col = data[i][1], mineNum = data[i][2];
			let target = this._mapList[row][col];
			let id = setTimeout(() => {
				target instanceof MineSweeperGrid && target.disappear();
				clearTimeout(id);
				if (mineNum != 0) {
					// if (!target) continue;
					let item = this.createObject("MineNum").asCom;
					item.x = target.x;
					item.y = target.y;
					item.getChild("num").text = mineNum + "";	
						this.addChildAt(item, 10);
					this._mapList[row][col] = item;
				} else {
					this._mapList[row][col] = null;
				}
			}, i * 1);
		}
	}
	private reStart() {
		this.clearAll();
		this._timeId && clearInterval(this._timeId) && (this._timeId = 0);
		this._board.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchGrid, this);
		MineSweeperModel.instance.init(this._maxRow, this._maxCol, this._mineNum);
		this.createMap();
		this.startTimer();
		// setTimeout(function () {
		// MineSweeperModel.instance.kaiGua()
		// }, 1000);

	}
	private gameOver(data) {
		let target = this._mapList[data.row][data.col];
		let item = this.createObject("Mine").asCom;
		item.x = target.x;
		item.y = target.y;
		if (data.boom) {
			item.getChild("boom").visible = true;
			this._timeId && clearInterval(this._timeId) && (this._timeId = 0);
			this._board.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchGrid, this);
		}
		this.addChild(item);
		target.parent &&
			target.removeFromParent();
		this._mapList[data.row][data.col] = item;
	}
	private clearAll() {
		console.log(this._mapList)
		this._mapList.forEach(r => {
			r.forEach(e => {
				if (e && e.parent) {
					e.dispose();
				}
			});
		});
	}
	public dispose() {
		this.removeListen();
		super.dispose();
	}
}