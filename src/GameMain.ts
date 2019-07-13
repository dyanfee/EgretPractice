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
		this.registComponent("Trailing", TrailingViaPic);
		this.registComponent("AStar", AstarPra.SeachMap);
		this.registComponent("translucenceGrid", AstarPra.Grid);
		this.registComponent("DragDemo", DragPro.DragDemoMain);
		this.registComponent("Trapezoid", DragPro.Trapezoid);
		this.registComponent("VirtualListMainView", VirtualListDemo.MainView);
		this.registComponent("ListCom", VirtualListDemo.ListCom);
		this.registComponent("Flash", Flash.MainView);
		this.registComponent("TextRoll", TextRoll.MainView);

	}
	initListen() {

	}
	removeListen() {

	}
	initView() {
		super.initView();
		// this._map = this.createObject("Trailing") as TrailingViaPic;
		// this._map = this.createObject("Flash") as Flash.MainView;
		this._map = this.createObject("TextRoll") as TextRoll.MainView;
		// this._map.init();
		this._ui.addChild(this._map);
		this.gameStart();
	}
	private gameStart() {
		// this._map.init();

	}

	private gameOver() {

	}
}