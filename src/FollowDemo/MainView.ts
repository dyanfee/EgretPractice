module FollowDemo {
	export class MainView extends MyComponent {
		public constructor() {
			super();
			this.test2();
		}
		/** 
		 * 转码zigzag
		 */
		private encodeZigzag(n: number) {
			return (n << 1) ^ (n >> 15);
		}
		private decodeZigzag(n: number) {
			return (n >>> 1) ^ -(n & 1);
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
		private readFromBuffer(buf: number[]) {
			let data = 0;
			let ret = [];
			let offset = 0;
			let len = buf.length;
			for (let i = 0; i < len; i++) {
				let n = buf[i];
				if ((n & 0x80) != 0x80) {
					data |= (n << offset);
					ret.push(data);
					offset = 0;
					data = 0;
					// break;
				} else {
					data |= ((n & 0x7f) << offset);
					offset += 7
				}
			}
			return ret;
		}

		public test2() {
			let n = [100, 100, 3423, 432, -111, -1000, 0, 1, -1];
			console.log(n);
			let dataStr = this.setListValue(n);
			console.log(dataStr);

			let ret = this.getListValue(dataStr);
			console.log(ret);

		}
		public setListValue(arr: Array<number>) {
			let dataStr = "";
			for (let i = 0; i < arr.length; i++) {
				let zz = this.encodeZigzag(arr[i]);
				// 自定义字符长度
				let buf = new Array();
				this.writeToBuffer(zz, buf, 3);
				dataStr += this.byteToString(buf);
			}
			return dataStr;
		}
		public getListValue(str: string) {
			let ret: number[] = [];
			let list = this.stringToByte(str);
			let dataList = this.readFromBuffer(list)
			for (let i = 0; i < dataList.length; i++) {
				ret.push(this.decodeZigzag(dataList[i]))
			}
			return ret;
		}
		private fill(str: string, fill: number = 8) {
			let len = fill - str.length;
			for (let i = 0; i < len; i++) {
				str = "0" + str;
			}
			return str;
		}
		private log(txt, n: number) {
			let a = n.toString(2);
			console.log(txt, this.fill(a));
		}
		// 将数组转为字符串
		private byteToString(arr: Array<number>) {
			let str: string = '';
			str = String.fromCharCode.apply(null, arr);
			return str;
		}
		private stringToByte(str: string) {
			let ch: number;
			let st: Array<number>;
			let re: Array<number> = [];

			for (let i = 0; i < str.length; i++) {
				ch = str.charCodeAt(i);  // get char  
				st = [];                 // set up "stack"  
				do {
					st.push(ch & 0xFF);  // push byte to stack
					ch = ch >> 8;          // shift value down by 1 byte
				}

				while (ch);
				// add stack contents to result  
				// done because chars have "wrong" endianness  
				re = re.concat(st.reverse());
			}
			// return an array of bytes  
			return re;
		}
	}
}


