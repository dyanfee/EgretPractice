class ComPools {
		private static _instance: ComPools;
		public static get instance() {
			if (!this._instance)
				this._instance = new ComPools();
			return this._instance;
		}

		public _Pool = {};
		private POOL_MAX: number = 10;

		// 通用缓存池
		public getCom(comName: string): fairygui.GComponent {
			if (!this._Pool[comName]) {
				this._Pool[comName] = [];
			}
			if (this._Pool[comName].length == 0) {
				return fairygui.UIPackage.createObject(Data.pkgName, comName).asCom;
			}
			return this._Pool[comName].shift();
		}
		public disposeCom(comName: string, com: any) {
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
		}
		public destory() {
			this._Pool = null;
			ComPools._instance = null;
		}
	}
