module Flash {

	export class MainView extends MyComponent {
		public constructor() {
			super();
		}
		private start: point;
		private end: point;

		private _thicknessS: fairygui.GSlider;
		private _boltsS: fairygui.GSlider;
		private _detailS: fairygui.GSlider;
		private _displaceS: fairygui.GSlider;
		private _thicknessV: fairygui.GTextField;
		private _boltsV: fairygui.GTextField;
		private _detailV: fairygui.GTextField;
		private _displaceV: fairygui.GTextField;


		private _line: egret.Shape;
		private _linePosList: point[];


		private _thickness: number = 1;
		private _bolts: number = 1;
		private _detail: number = 5;
		private _displace: number = 100;
		myload() {
			this._thicknessS = this.getChild("thicknesss").asSlider;
			this._boltsS = this.getChild("boltss").asSlider;
			this._detailS = this.getChild("details").asSlider;
			this._displaceS = this.getChild("displaces").asSlider;

			this._thicknessV = this.getChild("thicknessv").asTextField;
			this._boltsV = this.getChild("boltsv").asTextField;
			this._detailV = this.getChild("detailv").asTextField;
			this._displaceV = this.getChild("displacev").asTextField;


			this.start = { x: 20, y: 640 };
			this.end = { x: 700, y: 640 };

			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
			this._thicknessS.addEventListener(fairygui.StateChangeEvent.CHANGED, this.thicknessS, this);
			this._boltsS.addEventListener(fairygui.StateChangeEvent.CHANGED, this.boltsS, this);
			this._detailS.addEventListener(fairygui.StateChangeEvent.CHANGED, this.detailS, this);
			this._displaceS.addEventListener(fairygui.StateChangeEvent.CHANGED, this.displaceS, this);
			this.addEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
			this.thicknessS();
			this.boltsS();
			this.detailS();
			this.displaceS();
		}

		private onframe() {
			this.create();
		}

		public create() {
			if (!this._line)
				this._line = new egret.Shape();
			this._line.graphics.clear();
			this._line.graphics.lineStyle(this._thickness, 0xffffff);
			for (let i = 0; i < this._bolts; i++) {
				this._linePosList = [];
				this.collectionPos(this.start, this.end, this._displace);
				this._line.graphics.moveTo(this.start.x, this.start.y);

				this._linePosList.forEach(e => {
					this._line.graphics.lineTo(e.x, e.y);
				})
			}
			this._line.graphics.endFill();
			this.displayListContainer.addChild(this._line);
		}


		private collectionPos(startPos: point, endPos: point, displace: number) {
			if (displace < this._detail) {
				this._linePosList.push(startPos);
			} else {
				let mid: point = { x: 0, y: 0 };
				mid.x = (startPos.x + endPos.x) / 2;
				mid.y = (startPos.y + endPos.y) / 2;

				mid.x += (Math.random() - .5) * displace;
				mid.y += (Math.random() - .5) * displace;

				this.collectionPos(startPos, mid, displace / 2);
				this.collectionPos(mid, endPos, displace / 2);
			}
		}


		private thicknessS() {
			let value = this._thicknessS.value || 1;
			this._thicknessV.text = `${value}`;
			this._thickness = value;
		}

		private boltsS() {
			let value = this._boltsS.value || 1;
			this._boltsV.text = `${value}`;
			this._bolts = value;
		}

		private detailS() {
			let value = this._detailS.value / 10 || 0.1;
			this._detailV.text = `${value}`;
			this._detail = value;
		}

		private displaceS() {
			let value = this._displaceS.value || 1;
			this._displaceV.text = `${value}`;
			this._displace = value;
		}



		private touchBegin(e: egret.TouchEvent) {
			// this.end.x = e.stageX;
			// this.end.y = e.stageY;
			// this.create();
		}

		private touchMove(e: egret.TouchEvent) {
			// this.end.x = e.stageX;
			// this.end.y = e.stageY;
			// this.create();
		}
	}
}