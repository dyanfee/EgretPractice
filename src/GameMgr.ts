class GameMgr {
	private static _instance: GameMgr;
	public static get instance() {
		if (!this._instance)
			this._instance = new GameMgr();
		return this._instance;
	}
	private _time;
	private _scoreText: fairygui.GTextField;
	private _timeText: fairygui.GTextField;
	private _re: fairygui.GButton;
	private _timeId: number;
	private _target: any;
	init(target) {
		this._target = target;
		this._re = target.getChild("re").asButton;
		this._re.addClickListener(target.reStart, target)
		this._scoreText = target.getChild("score").asTextField;
		this._timeText = target.getChild("time").asTextField;
		this._scoreText.text = "0";
	}
	public set setScore(val) {
		this._scoreText.text = val + "";
	}
	public setTime() {
		this._time = 60;
		this._timeText.text = 60 + "";
		this._timeId && clearInterval(this._timeId)
		this._timeId = setInterval(() => {
			this._time--;
			this._timeText.text = this._time + "";
			if (this._time == 0) {
				clearInterval(this._timeId);
				this._target.gameOver();
			}
		}, 1000)
	}
	public destory() {
		GameMgr._instance = null;
	}
}