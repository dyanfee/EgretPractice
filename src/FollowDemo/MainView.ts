module FollowDemo {
	export class MainView extends MyComponent {
		public constructor() {
			super();
			this.test();
		}
		/** 
		 * 转码zigzag
		 */
		private encodeZigzag(n: number) {
			return (n << 1) ^ (n >> 15);
		}
		private decodeZigzag(n: number) {
			return (n >> 1) ^ -(n & 1);
		}
		private writeToBuffer(zigzag: number, buf, size) {
			let ret = 0;
			for (let i = 0; i < size; i++) {
				if ((zigzag & (~0x7f)) == 0) {
					buf[i] = zigzag;
					ret = i + 1;
					break;
				} else {
					buf[i] = (zigzag & (0x7f) | 0x80)
					zigzag = zigzag >> 7
				}
			}
			return ret;
		}
		private readFromBuffer(buf, size) {
			let ret = 0;
			let offset = 0;
			for (let i = 0; i < size; i++ , offset += 7) {
				let n = buf[i];
				if ((n & 0x80) != 0x80) {
					ret |= (n << offset);
					break;
				} else {
					ret |= ((n & 0x7f) << offset);
				}
			}
			return ret;
		}

		private test() {
			let n = [15];
			// let n = [15, -100, 1000, -455, 10];
			for (let i = 0; i < n.length; i++) {
				let zigzag = this.encodeZigzag(n[i]);
				console.log("zigzag", zigzag.toString());

				let writeBuf = this.writeToBuffer(zigzag,)
			}
		}
	}
}


