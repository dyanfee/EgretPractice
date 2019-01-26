class FairyWindow extends MyComponent {
    protected m_pPackName: string;
    protected m_pResName: string;
    protected _ui: fairygui.GComponent;
    /**
     * pkgName:包名 
     * resName:模块名
     */
    constructor(pkgName: string, resName: string) {
        super();
        this.m_pPackName = pkgName;
        this.m_pResName = resName;
        fairygui.UIPackage.addPackage(pkgName);
        egret.lifecycle.stage.addChild(fairygui.GRoot.inst.displayObject);
        this.onInit();
    }

    onInit(): void {
        this.initComponents();
        this.initView();
        this.initListen();
    }
    protected initListen() { }
    /**
     * 绑定组件和类
     */
    protected initComponents(): void {

    }
    /**
     * 注册UI与类
     */
    protected registComponent(p_className: string, p_class: any): void {
        fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL(this.m_pPackName, p_className), p_class);
    }
    protected initView() {
        if (this.m_pResName == "") {
            return;
        }
        var _uiObj = this.createObject(this.m_pResName)
        if (!_uiObj) {
            console.error("[FairyWindow] initView() createObject is null", this.m_pPackName, this.m_pResName);
            return
        }
        this._ui = _uiObj.asCom;
        fairygui.GRoot.inst.addChild(this._ui);
    }
    protected createObject(resName: string): any {
        return fairygui.UIPackage.createObject(this.m_pPackName, resName);
    }
    dispose(): void {
        if (this._ui) {
            this._ui.dispose();
            this._ui = null;
        }
        super.dispose();
    }
}