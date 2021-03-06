var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MainPanel = (function (_super) {
    __extends(MainPanel, _super);
    function MainPanel() {
        return _super.call(this, Data.pkgName, "GameMain") || this;
    }
    MainPanel.prototype.initComponents = function () {
        _super.prototype.initComponents.call(this);
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
        this.registComponent("RollItem", TextRoll.RollItem);
        this.registComponent("Collision", Collision.CircleLine);
        this.registComponent("RectCollision", Collision.RectTest);
        this.registComponent("FollowDemo", FollowDemo.MainView);
        this.registComponent("Physics", PhysicsDemo.MainView);
    };
    MainPanel.prototype.initListen = function () {
    };
    MainPanel.prototype.removeListen = function () {
    };
    MainPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        // this._map = this.createObject("Trailing") as TrailingViaPic;
        // this._map = this.createObject("Flash") as Flash.MainView;
        // this._map = this.createObject("TextRoll") as TextRoll.MainView;
        // this._map = this.createObject("Collision") as Collision.MainView;
        // this._map = this.createObject("FollowDemo") as FollowDemo.MainView;
        // this._map = this.createObject("Physics") as FollowDemo.MainView;
        this._map = this.createObject("RectCollision");
        // this._map.init();
        this._ui.addChild(this._map);
        this.gameStart();
    };
    MainPanel.prototype.gameStart = function () {
        // this._map.init();
    };
    MainPanel.prototype.gameOver = function () {
    };
    return MainPanel;
}(FairyWindow));
__reflect(MainPanel.prototype, "MainPanel");
//# sourceMappingURL=GameMain.js.map