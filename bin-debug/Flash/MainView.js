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
var Flash;
(function (Flash) {
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            var _this = _super.call(this) || this;
            _this._thickness = 1;
            _this._bolts = 1;
            _this._detail = 5;
            _this._displace = 100;
            return _this;
        }
        MainView.prototype.myload = function () {
            this._thicknessS = this.getChild("thicknesss").asSlider;
            this._boltsS = this.getChild("boltss").asSlider;
            this._detailS = this.getChild("details").asSlider;
            this._displaceS = this.getChild("displaces").asSlider;
            this._thicknessV = this.getChild("thicknessv").asTextField;
            this._boltsV = this.getChild("boltsv").asTextField;
            this._detailV = this.getChild("detailv").asTextField;
            this._displaceV = this.getChild("displacev").asTextField;
            this.start = { x: 20, y: 640 };
            this.end = { x: 700, y: 640 };
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
            this._thicknessS.addEventListener(fairygui.StateChangeEvent.CHANGED, this.thicknessS, this);
            this._boltsS.addEventListener(fairygui.StateChangeEvent.CHANGED, this.boltsS, this);
            this._detailS.addEventListener(fairygui.StateChangeEvent.CHANGED, this.detailS, this);
            this._displaceS.addEventListener(fairygui.StateChangeEvent.CHANGED, this.displaceS, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
            this.thicknessS();
            this.boltsS();
            this.detailS();
            this.displaceS();
        };
        MainView.prototype.onframe = function () {
            this.create();
        };
        MainView.prototype.create = function () {
            var _this = this;
            if (!this._line)
                this._line = new egret.Shape();
            this._line.graphics.clear();
            this._line.graphics.lineStyle(this._thickness, 0xffffff);
            for (var i = 0; i < this._bolts; i++) {
                this._linePosList = [];
                this.collectionPos(this.start, this.end, this._displace);
                this._line.graphics.moveTo(this.start.x, this.start.y);
                this._linePosList.forEach(function (e) {
                    _this._line.graphics.lineTo(e.x, e.y);
                });
            }
            this._line.graphics.endFill();
            this.displayListContainer.addChild(this._line);
        };
        MainView.prototype.collectionPos = function (startPos, endPos, displace) {
            if (displace < this._detail) {
                this._linePosList.push(startPos);
            }
            else {
                var mid = { x: 0, y: 0 };
                mid.x = (startPos.x + endPos.x) / 2;
                mid.y = (startPos.y + endPos.y) / 2;
                mid.x += (Math.random() - .5) * displace;
                mid.y += (Math.random() - .5) * displace;
                this.collectionPos(startPos, mid, displace / 2);
                this.collectionPos(mid, endPos, displace / 2);
            }
        };
        MainView.prototype.thicknessS = function () {
            var value = this._thicknessS.value || 1;
            this._thicknessV.text = "" + value;
            this._thickness = value;
        };
        MainView.prototype.boltsS = function () {
            var value = this._boltsS.value || 1;
            this._boltsV.text = "" + value;
            this._bolts = value;
        };
        MainView.prototype.detailS = function () {
            var value = this._detailS.value / 10 || 0.1;
            this._detailV.text = "" + value;
            this._detail = value;
        };
        MainView.prototype.displaceS = function () {
            var value = this._displaceS.value || 1;
            this._displaceV.text = "" + value;
            this._displace = value;
        };
        MainView.prototype.touchBegin = function (e) {
            // this.end.x = e.stageX;
            // this.end.y = e.stageY;
            // this.create();
        };
        MainView.prototype.touchMove = function (e) {
            // this.end.x = e.stageX;
            // this.end.y = e.stageY;
            // this.create();
        };
        return MainView;
    }(MyComponent));
    Flash.MainView = MainView;
    __reflect(MainView.prototype, "Flash.MainView");
})(Flash || (Flash = {}));
//# sourceMappingURL=MainView.js.map