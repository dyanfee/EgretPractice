module DragPro {
	export class Model {
		public constructor() {
		}
		private static _inst: Model;
		public static get instance(): Model {
			return this._inst || (this._inst = new Model());
		}

		// 开始拖拽
		private _initPoint: egret.Point;

		// 结束拖拽
		private _lastPoint: egret.Point;

		// 角度
		private _radian: number;

		public init() {

		}

		public initDrag(initpoint: egret.Point) {
			this._radian = 0;
			this._initPoint = initpoint;
		}
	}
}