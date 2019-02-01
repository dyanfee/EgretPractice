var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MyEvent = (function () {
    function MyEvent() {
        this.eventMap = {};
    }
    Object.defineProperty(MyEvent, "instance", {
        get: function () {
            if (!this._inst)
                this._inst = new MyEvent();
            return this._inst;
        },
        enumerable: true,
        configurable: true
    });
    MyEvent.add = function (type, call, thisObj) {
        MyEvent.instance.add(type, call, thisObj);
    };
    MyEvent.off = function (type, call, thisObj) {
        MyEvent.instance.off(type, call, thisObj);
    };
    MyEvent.dispach = function (type, args) {
        MyEvent.instance.dispach(type, args);
    };
    /** 监听事件*/
    MyEvent.prototype.add = function (type, call, thisObj) {
        if (!this.eventMap[type])
            this.eventMap[type] = [];
        var evt = {};
        evt.callBack = call;
        evt.thisObj = thisObj;
        this.eventMap[type].push(evt);
    };
    /** 移除监听*/
    MyEvent.prototype.off = function (type, call, thisObj) {
        if (!type) {
            this.eventMap = {}; // 不带参直接清除所有监听
            return;
        }
        if (!call) {
            this.eventMap[type] = []; // 不带回掉直接清除同一事件的所有监听
            delete this.eventMap[type];
            return;
        }
        var arr = this.eventMap[type];
        if (!thisObj || !arr)
            return;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].callBack == call && arr[i].thisObj == thisObj) {
                arr.splice(i, 1);
            }
        }
        if (!arr.length)
            delete this.eventMap[type];
    };
    MyEvent.prototype.dispach = function (type, args) {
        if (!this.eventMap[type] || !this.eventMap[type].length)
            return;
        var arr = this.eventMap[type];
        for (var i = 0; i < arr.length; i++) {
            arr[i].callBack.call(arr[i].thisObj, args);
        }
    };
    return MyEvent;
}());
__reflect(MyEvent.prototype, "MyEvent");
