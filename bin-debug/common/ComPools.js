var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ComPools = (function () {
    function ComPools() {
        this._Pool = {};
        this.POOL_MAX = 10;
    }
    Object.defineProperty(ComPools, "instance", {
        get: function () {
            if (!this._instance)
                this._instance = new ComPools();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    // 通用缓存池
    ComPools.prototype.getCom = function (comName) {
        if (!this._Pool[comName]) {
            this._Pool[comName] = [];
        }
        if (this._Pool[comName].length == 0) {
            return fairygui.UIPackage.createObject(Data.pkgName, comName).asCom;
        }
        return this._Pool[comName].shift();
    };
    ComPools.prototype.disposeCom = function (comName, com) {
        // console.log("----------------------------------------------------------", this._Pool);
        if (!this._Pool[comName]) {
            this._Pool[comName] = [];
        }
        if (!this._Pool[comName].length && !com)
            return;
        if (this._Pool[comName].length < this.POOL_MAX) {
            this._Pool[comName].push(com);
            if (com && com.parent) {
                com.removeFromParent();
            }
        }
        else {
            com.asCom.dispose();
            com = null;
        }
    };
    ComPools.prototype.destory = function () {
        this._Pool = null;
        ComPools._instance = null;
    };
    return ComPools;
}());
__reflect(ComPools.prototype, "ComPools");
