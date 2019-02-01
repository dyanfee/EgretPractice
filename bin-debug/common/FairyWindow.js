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
var FairyWindow = (function (_super) {
    __extends(FairyWindow, _super);
    /**
     * pkgName:包名
     * resName:模块名
     */
    function FairyWindow(pkgName, resName) {
        var _this = _super.call(this) || this;
        _this.m_pPackName = pkgName;
        _this.m_pResName = resName;
        fairygui.UIPackage.addPackage(pkgName);
        egret.lifecycle.stage.addChild(fairygui.GRoot.inst.displayObject);
        _this.onInit();
        return _this;
    }
    FairyWindow.prototype.onInit = function () {
        this.initComponents();
        this.initView();
        this.initListen();
    };
    FairyWindow.prototype.initListen = function () { };
    /**
     * 绑定组件和类
     */
    FairyWindow.prototype.initComponents = function () {
    };
    /**
     * 注册UI与类
     */
    FairyWindow.prototype.registComponent = function (p_className, p_class) {
        fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL(this.m_pPackName, p_className), p_class);
    };
    FairyWindow.prototype.initView = function () {
        if (this.m_pResName == "") {
            return;
        }
        var _uiObj = this.createObject(this.m_pResName);
        if (!_uiObj) {
            console.error("[FairyWindow] initView() createObject is null", this.m_pPackName, this.m_pResName);
            return;
        }
        this._ui = _uiObj.asCom;
        fairygui.GRoot.inst.addChild(this._ui);
    };
    FairyWindow.prototype.createObject = function (resName) {
        return fairygui.UIPackage.createObject(this.m_pPackName, resName);
    };
    FairyWindow.prototype.dispose = function () {
        if (this._ui) {
            this._ui.dispose();
            this._ui = null;
        }
        _super.prototype.dispose.call(this);
    };
    return FairyWindow;
}(MyComponent));
__reflect(FairyWindow.prototype, "FairyWindow");
