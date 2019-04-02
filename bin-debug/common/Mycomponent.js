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
var MyComponent = (function (_super) {
    __extends(MyComponent, _super);
    function MyComponent() {
        return _super.call(this) || this;
    }
    MyComponent.prototype.constructFromResource = function () {
        _super.prototype.constructFromResource.call(this);
        this.myload();
    };
    MyComponent.prototype.myload = function () { };
    MyComponent.prototype.createObject = function (resName) {
        return fairygui.UIPackage.createObject(Data.pkgName, resName);
    };
    /**
 * 注册UI与类
 */
    MyComponent.prototype.registComponent = function (p_packName, p_className, p_class) {
        fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL(p_packName, p_className), p_class);
    };
    return MyComponent;
}(fairygui.GComponent));
__reflect(MyComponent.prototype, "MyComponent");
//# sourceMappingURL=Mycomponent.js.map