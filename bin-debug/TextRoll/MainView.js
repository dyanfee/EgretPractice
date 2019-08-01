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
var TextRoll;
(function (TextRoll) {
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            return _super.call(this) || this;
        }
        MainView.prototype.myload = function () {
            var _this = this;
            this._list = this.getChild("roll").asCom.getChildAt(0).asList;
            setInterval(function () {
                _this.rollToValue(Math.floor(Math.random() * 100000));
                // this.rollToValue(((Math.floor(Math.random() * 10).toString() as any).repeat(3)))
            }, 1000);
        };
        MainView.prototype.initInfo = function () {
        };
        MainView.prototype.rollToValue = function (val) {
            var text = "" + val;
            var len = text.length;
            if (this._list.numItems != len) {
                this._list.numItems = len;
            }
            for (var i = 0; i < len; i++) {
                this._list.getChildAt(i).setItemData(text[i]);
            }
        };
        return MainView;
    }(MyComponent));
    TextRoll.MainView = MainView;
    __reflect(MainView.prototype, "TextRoll.MainView");
    var RollItem = (function (_super) {
        __extends(RollItem, _super);
        function RollItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.__ = 0;
            return _this;
        }
        RollItem.prototype.myload = function () {
            this._list = this.getChildAt(0).asList;
            this._list.itemRenderer = this.itemRender;
            this._list.setVirtualAndLoop();
            this._list.numItems = 10;
        };
        RollItem.prototype.itemRender = function (index, item) {
            item.getChildAt(0).asTextField.text = "" + index;
        };
        RollItem.prototype.setItemData = function (num) {
            num = parseInt(num);
            // let ratio;
            // if (num > this.__) {
            // 	ratio = num - this.__;
            // } else {
            // 	ratio = num + this.__;
            // }
            // this.__ = num;
            // this._list.scrollPane.scrollDown(ratio, true);
            this._list.scrollToView(num, true);
            // this._list.numItems = 10;
        };
        return RollItem;
    }(MyComponent));
    TextRoll.RollItem = RollItem;
    __reflect(RollItem.prototype, "TextRoll.RollItem");
})(TextRoll || (TextRoll = {}));
//# sourceMappingURL=MainView.js.map