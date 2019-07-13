module Flash {
	export interface point {
		x: number;
		y: number;
	}
	export class Point {
		constructor(x: number, y: number) {
			this._x = x;
			this._y = y;
		}
		public static get Point():number{
			return 0
		}
		private _x: number;
		private _y: number;

		public get x(): number {
			return this._x;
		}
		public set x(v: number) {
			this._x = v;
		}


		public get y(): number {
			return this._y;
		}
		public set y(v: number) {
			this._y = v;
		}


	}
} 