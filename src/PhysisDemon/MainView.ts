module PhysicsDemo {
	export class MainView extends MyComponent {
		public constructor() {
			super();
			this.createScreen();
		}
		public createScreen() {
			let demo = new P_demo5();
			this.addChild(demo);

			// let demo = new TestP2RevoluteConstraint();
			// this.displayListContainer.addChild(demo);
		}
	}
}