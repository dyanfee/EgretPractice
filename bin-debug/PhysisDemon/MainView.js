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
var PhysicsDemo;
(function (PhysicsDemo) {
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            var _this = _super.call(this) || this;
            _this.createScreen();
            return _this;
        }
        MainView.prototype.createScreen = function () {
            var demo = new PhysicsDemo.P_demo5();
            this.addChild(demo);
            // let demo = new TestP2RevoluteConstraint();
            // this.displayListContainer.addChild(demo);
        };
        return MainView;
    }(MyComponent));
    PhysicsDemo.MainView = MainView;
    __reflect(MainView.prototype, "PhysicsDemo.MainView");
})(PhysicsDemo || (PhysicsDemo = {}));
//# sourceMappingURL=MainView.js.map