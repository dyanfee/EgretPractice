module DragPro {
	export class GameMgr {
		public constructor() {
		}
		private static _inst: GameMgr;
		public static get instance(): GameMgr {
			return this._inst || (this._inst = new GameMgr());
		}

		public start(){
			
		}
	}
}