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
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            var _this = _super.call(this) || this;
            _this._virtualData = [];
            _this._dataLen = 14;
            // private setListData() {
            // 	for (let i = 0; i < this._dataLen; i++) {
            // 		MainView.listData[i] = this._virtualData[i];
            // 	}
            // 	// console.log(MainView.listData);
            // 	// console.log(this._finishedIdList);
            // }
            _this._finishedIdList = [3, 5, 1, 6];
            _this._gottaList = [];
            return _this;
        }
        MainView.prototype.myload = function () {
            this._list = this.getChild("list").asList;
            this.addListen();
        };
        MainView.prototype.init = function () {
            this.parseData();
            this.updataListData();
            this._list.itemRenderer = this.renderItem;
            this._list.setVirtual();
            this._list.numItems = MainView.listData.length;
        };
        MainView.prototype.addListen = function () {
            MyEvent.add("touchAcpt", this.refreshTask, this);
        };
        MainView.prototype.removeListen = function () {
            MyEvent.off("touchAcpt", this.refreshTask, this);
        };
        MainView.prototype.parseData = function () {
            var item = RES.getRes("virtualListDemoData_json");
            for (var key in item) {
                this._virtualData.push({
                    id: item[key].id,
                    itemName: item[key].condition,
                    desc: item[key].describe,
                    state: 0
                });
            }
        };
        MainView.prototype.renderItem = function (index, item) {
            item.setData(MainView.listData[index]);
        };
        MainView.prototype.getFinishedList = function () {
            return this._finishedIdList.sort(function (a, b) {
                return a - b;
            });
        };
        MainView.prototype.refreshTask = function (taskId) {
            var index = 0;
            for (var i = 0; i < MainView.listData.length; i++) {
                var item_1 = MainView.listData[i];
                if (taskId == item_1.id) {
                    index = i;
                    this._gottaList.push(taskId);
                    this._finishedIdList.splice(this._finishedIdList.indexOf(taskId), 1);
                    break;
                }
            }
            console.log("已完成列表：" + this._finishedIdList);
            console.log("已领取列表：" + this._gottaList);
            var item = this._list.getChildAt(index);
            // item.changeState();
            this.updataListData();
            this._list.numItems = MainView.listData.length;
        };
        MainView.prototype.updataListData = function () {
            var tempList = [];
            for (var i = 0; i < this._dataLen; i++) {
                tempList[i] = this._virtualData[i];
            }
            for (var i = 0; i < tempList.length; i++) {
                if (this.getFinishedList().indexOf(tempList[i].id) != -1) {
                    var item = tempList.splice(i, 1)[0];
                    item.state = 1;
                    tempList.unshift(item);
                }
            }
            for (var i = tempList.length - 1; i >= 0; i--) {
                if (this._gottaList.indexOf(tempList[i].id) != -1) {
                    var item = tempList.splice(i, 1)[0];
                    item.state = 2;
                    tempList.push(item);
                }
            }
            MainView.listData = tempList;
        };
        MainView.listData = [];
        return MainView;
    }(MyComponent));
    VirtualListDemo.MainView = MainView;
    __reflect(MainView.prototype, "VirtualListDemo.MainView");
})(VirtualListDemo || (VirtualListDemo = {}));
//# sourceMappingURL=MianView.js.map