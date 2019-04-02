module AstarPra {
	export class Node {
		public constructor(x: number, y: number) {
			this.row = x;
			this.col = y;
		}
		public row: number;
		public col: number;
		public f: number ;
		public g: number ;
		public h: number ;
		public walkable: boolean = true;
		public parent: Node;
	}
}
