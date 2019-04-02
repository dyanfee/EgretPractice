class Map1 extends MyComponent {
	public constructor() {
		super();
	}
	private _score;

	// 回合数
	private _roundNum: number;
	// 一行格子最大个数
	private _maxGridNum: number;
	// 不同格颜色差值 值越小颜色相差越小
	private _colorDefaultNum;
	private _diffGrid: number;
	private _gridList: fairygui.GComponent[];

	private _time;
	private _scoreText: fairygui.GTextField;
	private _timeText: fairygui.GTextField;
	private _re: fairygui.GButton;
	private _timeId: number;
	myload() {
		this._re = this.getChild("re").asButton;
		this._re.addClickListener(this.reStart, this)
		this._scoreText = this.getChild("score").asTextField;
		this._timeText = this.getChild("time").asTextField;
		this.addListen();
	}
	private addListen() {
		MyEvent.add(Data.NEXT_ROUND, this.nextRound, this);
	}
	private removeListen() {
		MyEvent.off(Data.NEXT_ROUND, this.nextRound, this);

	}
	public init() {
		this.Timer();
		this._score = 0;
		this._roundNum = 1;
		this._maxGridNum = 9;
		this._colorDefaultNum = 50;
		this.clearGrid();
		this._gridList = [];
		this.createGrid();
		// setInterval(() => {
		// 	this.nextRound();
		// }, 500)
	}
	private reStart() {
		this.setscore(0);
		this._timeId && clearInterval(this._timeId);
		this.init();
	}
	public setscore(val) {
		this._scoreText.text = val.toString();
	}
	private Timer() {
		this._time = 60;
		this._timeText.text = this._time + "";
		this._timeId = setInterval(() => {
			if (this._time == 0) {
				this.clearGrid();
				clearInterval(this._timeId)
			}
			this._timeText.text = (this._time--).toString();
		}, 1000)
	}

	private createGrid() {
		let gridNum: number // 一行的格子数
			, gridTotal: number// 总格子数
			, margin: number // 边缘宽度
			, pad: number = 20 // 格子间距
			, gridwh: number // 格子宽高
			, color  // 格子颜色
		if (this._roundNum < this._maxGridNum) {
			gridNum = this._roundNum + 1;
		}
		else {
			gridNum = this._maxGridNum;
		}
		gridTotal = Math.pow(gridNum, 2);
		// 逻辑计算 计算边缘 计算格子宽度 随机不同颜色格子位置
		pad = (this._maxGridNum - gridNum + 2) / this._maxGridNum * pad;
		gridwh = (this._maxGridNum - 1.7) / this._maxGridNum * (Data.getWidth / gridNum);
		margin = (Data.getWidth - pad * (gridNum - 1) - gridwh * gridNum) / 2;
		this._diffGrid = Math.floor(Math.random() * gridTotal);
		color = this.setColor(); //得到随机颜色
		for (let i = 0; i < gridTotal; i++) {
			let item: SwitchColorGrid = this.createObject("Grid").asCom;
			let graph = item.getChildAt(0).asGraph;
			graph.width = graph.height =
				item.width = item.height = gridwh; // 设置格子的宽高
			// 设置格子位置
			item.x = margin + (pad + item.width) * (i % gridNum);
			item.y = 345 + margin + (pad + item.height) * Math.floor(i / gridNum);
			graph.color = color;
			// 随机得到的不同颜色格子设置点击
			if (i == this._diffGrid) {
				graph.color = this._colorRound;
				item.isKey = true;
				item.addListen();
			}
			this.addChild(item)
			this._gridList.push(item);
		}

	}
	private nextRound() {
		this._score++;
		this._roundNum++;
		this.clearGrid();
		this.createGrid()
		this.setscore(this._score);
	}
	private _colorRound;
	private setColor() {
		let r, g, b;
		r = Math.floor(Math.random() * (0xff - this._colorDefaultNum) + this._colorDefaultNum);
		g = Math.floor(Math.random() * (0xff - this._colorDefaultNum) + this._colorDefaultNum);
		b = Math.floor(Math.random() * (0xff - this._colorDefaultNum) + this._colorDefaultNum);
		if (this._colorDefaultNum > 5) {
			this._colorDefaultNum -= 3;
		}
		// 随机改变一些颜色
		this._colorRound = ((r - this._colorDefaultNum) << 16)
			+ ((g - this._colorDefaultNum) << 8)
			+ b - this._colorDefaultNum
		let color = (r << 16)
			+ (g << 8)
			+ b

		return color;
	}
	public clearGrid() {
		this._gridList &&
			this._gridList.forEach(e => {
				if (e && e.parent)
					e.removeFromParent();
				e.dispose();
			})
		this._gridList = [];
	}
	dispose() {
		super.dispose();
		this.removeListen();
	}
}