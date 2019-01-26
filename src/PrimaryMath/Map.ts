class Map2 extends MyComponent {
	public constructor() {
		super();

	}
	private _score: number;
	private _gridNum: number = 2;
	private _maxBits: number = 10;
	private _operatorList: PrimaryMathGrid[];
	private _first: fairygui.GTextField;
	private _second: fairygui.GTextField;
	private _result: fairygui.GTextField;
	onload() {
		this._first = this.getChild("input1").asTextField;
		this._second = this.getChild("input2").asTextField;
		this._result = this.getChild("answer").asTextField;
	}
	public init() {
		this._score = 0;
		this._operatorList = [];
		this.createOperator();
		this.addListen();
		GameMgr.instance.init(this);
		GameMgr.instance.setTime();

	}
	private addListen() {
		MyEvent.add(Data.NEXT_ROUND, this.nextRound, this);
	}
	private removeListen() {
		MyEvent.off(Data.NEXT_ROUND, this.nextRound, this);
	}
	private createOperator() {
		this.clearGrid();
		let oplist = [0, 1, 2, 3];
		let method = this.creAlgorithm();
		for (let i = 0; i < 4; i++) {
			let c = oplist.splice(Math.floor(Math.random() * oplist.length), 1)[0];
			console.log(c);
			let item = ComPools.instance.getCom("PrimaryMathGrid") as PrimaryMathGrid;
			item.x = 220 + (item.width + 40) * (i % this._gridNum);
			item.y = 680 + (item.height + 30) * Math.floor(i / 2);
			item.initGrid(c);
			if (c == method) {
				item.setKey(true);
			}
			this.addChild(item);
			this._operatorList.push(item);

		}
	}
	private creAlgorithm() {
		let randomMethod = Math.floor(Math.random() * 4);
		let i = Math.ceil(Math.random() * this._maxBits);
		let j = Math.ceil(Math.random() * this._maxBits);
		let k;
		switch (randomMethod) {
			case OperatorEnum.ADDITION:
				k = i + j;
				break;
			case OperatorEnum.SUBTRACTIN:
				k = i - j;
				break;
			case OperatorEnum.MULTIPLICATION:
				k = i * j;
				break;
			case OperatorEnum.DIVISION:
				let temp;
				k = i * j;
				temp = i;
				i = k;
				k = temp;
				break;
		}
		this._first.text = i + "";
		this._second.text = j + "";
		this._result.text = k + "";
		return randomMethod;
	}

	private nextRound() {
		this._score++;
		GameMgr.instance.setScore = this._score;
		// this._maxBits += 10;
		this.clearGrid();
		this.createOperator();
	}
	public reStart() {
		GameMgr.instance.setScore = this._score = 0;
		this._maxBits = 10;
		this.createOperator();
		GameMgr.instance.setTime();

	}
	public gameOver() {
		this.clearGrid();
	}
	private clearGrid() {
		this._operatorList
			&& this._operatorList.forEach(e => {
				ComPools.instance.disposeCom("PrimaryMathGrid", e);
				e.release()
			})
		this._operatorList = [];
	}
	dispose() {
		this.removeListen();
		super.dispose();
	}
}
class OperatorEnum {
	static ADDITION: number = 0;
	static SUBTRACTIN: number = 1;
	static MULTIPLICATION: number = 2;
	static DIVISION: number = 3;
}