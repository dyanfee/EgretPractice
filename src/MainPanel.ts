class MainPanel extends FairyWindow {
	public constructor() {
		super(Data.pkgName, "GameMain");
	}

	private _map: any;

	initComponents() {
		super.initComponents();
		this.registComponent("SwitchColor", Map1);
		this.registComponent("SwitchColorGrid", SwitchColorGrid);
		this.registComponent("PrimaryMath", Map2);
		this.registComponent("PrimaryMathGrid", PrimaryMathGrid);
		this.registComponent("MineSweeper", MineSweeper);
		this.registComponent("MineSweeperGrid", MineSweeperGrid);
		// this.registComponent("Trailing", Trailing);
		// this.registComponent("Trailing", Trailing2);
		this.registComponent("Trailing", Trailing3);
		this.registComponent("AStar", PracticePro.SeachMap);
		this.registComponent("translucenceGrid", PracticePro.Grid);

	}
	initListen() {

	}
	removeListen() {

	}
	initView() {
		super.initView();
		this._map = this.createObject("AStar") as PracticePro.SeachMap;
		this._ui.addChild(this._map);
		this.gameStart();
	}
	private gameStart() {
		// this._map.init();

	}

	private gameOver() {

	}
}