class MyComponent extends fairygui.GComponent {
    constructor() {
        super();
    }
    constructFromResource() {
        super.constructFromResource();
        this.onload();
    }
    protected onload() { }
    protected createObject(resName: string): any {
        return fairygui.UIPackage.createObject(Data.pkgName, resName);
    }
}