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
var VirtualListDemo;
(function (VirtualListDemo) {
    var ListCom = (function (_super) {
        __extends(ListCom, _super);
        function ListCom() {
            return _super.call(this) || this;
        }
        ListCom.prototype.myload = function () {
            this._itemName = this.getChild("itemName").asTextField;
            this._itemDesc = this.getChild("itemDesc").asTextField;
            this._btnAcpt = this.getChild("acptBtn").asButton;
            this._btnAcpt.addClickListener(this.acept, this);
        };
        ListCom.prototype.setData = function (data) {
            this._itemName.text = data.itemName;
            this._itemDesc.text = data.desc;
            this._taskId = data.id;
            // this._btnAcpt.enabled = true;
            this._btnAcpt.enabled = true;
            if (data.state == 0) {
                this._btnAcpt.enabled = false;
                this._btnAcpt.selected = false;
            }
            else if (data.state == 1) {
                this._btnAcpt.selected = false;
            }
            else {
                this._btnAcpt.touchable = false;
                this._btnAcpt.selected = true;
            }
        };
        ListCom.prototype.acept = function () {
            MyEvent.dispach("touchAcpt", this._taskId);
        };
        ListCom.prototype.changeState = function () {
            this._btnAcpt.selected = true;
            this._btnAcpt.touchable = false;
            this._btnAcpt.enabled = true;
        };
        return ListCom;
    }(MyComponent));
    VirtualListDemo.ListCom = ListCom;
    __reflect(ListCom.prototype, "VirtualListDemo.ListCom");
})(VirtualListDemo || (VirtualListDemo = {}));
//# sourceMappingURL=ListCom.js.map