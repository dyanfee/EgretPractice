class MyComponent extends fairygui.GComponent {
    constructor() {
        super();
    }
    constructFromResource() {
        super.constructFromResource();
        this.myload();
    }
    protected myload() { }
    protected createObject(resName: string): any {
        return fairygui.UIPackage.createObject(Data.pkgName, resName);
    }
    /**
 * 注册UI与类
 */
    protected registComponent(p_packName: string, p_className: string, p_class: any): void {
        fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL(p_packName, p_className), p_class);
    }
}