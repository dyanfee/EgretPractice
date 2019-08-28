class CompressTool {
	/** 
	 * 转码zigzag
	 */
	private static encodeZigzag(n: number) {
		return (n << 1) ^ (n >> 15);
	}
	/**
	 * 解码zigzag
	 */
	private static decodeZigzag(n: number) {
		return (n >>> 1) ^ -(n & 1);
	}
	private static writeToBuffer1(zigzag: number, buf, size) {
		let ret = 0;
		for (let i = 0; i < size; i++) {
			if ((zigzag & (~0x3f)) == 0) {
				buf[i] = (zigzag | 0x40);
				ret = i + 1;
				break;
			} else {
				buf[i] = (zigzag & (0x3f) | 0xc0)
				zigzag = zigzag >> 6
			}
		}
		return ret;
	}
	/**
	 * 自字节表示长度
	 * @param zigzag zigzag数字
	 * @param 压缩后数组
	 */
	private static writeToBuffer(zigzag: number, buf, size) {
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
	/** 
	 * 读取zigzag 数组
	 */
	private static readFromBuffer(buf: number[]) {
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
	private static readFromBuffer1(buf: number[]) {
		let data = 0;
		let ret = [];
		let offset = 0;
		let len = buf.length;
		for (let i = 0; i < len; i++) {
			let n = (buf[i] ^ 0x40);
			if ((n & 0x80) != 0x80) {
				data |= (n << offset);
				ret.push(data);
				offset = 0;
				data = 0;
				// break;
			} else {
				data |= ((n & 0x3f) << offset);
				offset += 6
			}
		}
		return ret;
	}
	/**
	 * 将数值压缩为字符串
	 * @param arr 数组number
	 */
	public static setListValue(arr: Array<number>) {
		let dataStr = "";
		for (let i = 0; i < arr.length; i++) {
			if (typeof (arr[i]) != "number") {
				console.log("只能压缩数字!", arr[i]);
				return
			}
			let zz = this.encodeZigzag(arr[i]);
			// 自定义字符长度
			let buf = new Array();
			this.writeToBuffer(zz, buf, 3);
			dataStr += this.byteToString(buf);
		}
		return dataStr;
	}
	public static setListValue1(arr: Array<number>) {
		let dataStr = "";
		for (let i = 0; i < arr.length; i++) {
			if (typeof (arr[i]) != "number") {
				console.log("只能压缩数字!", arr[i]);
				return
			}
			let zz = this.encodeZigzag(arr[i]);
			// 自定义字符长度
			let buf = new Array();
			this.writeToBuffer1(zz, buf, 3);
			dataStr += this.byteToString(buf);
		}
		return dataStr;
	}
	/**
	 * 将字符串解压为数组
	 */
	public static getListValue(str: string) {
		let ret: number[] = [];
		let list = this.stringToByte(str);
		let dataList = this.readFromBuffer(list);
		for (let i = 0; i < dataList.length; i++) {
			ret.push(this.decodeZigzag(dataList[i]))
		}
		return ret;
	}
	public static getListValue1(str: string) {
		let ret: number[] = [];
		let list = this.stringToByte(str);
		let dataList = this.readFromBuffer1(list);
		for (let i = 0; i < dataList.length; i++) {
			ret.push(this.decodeZigzag(dataList[i]))
		}
		return ret;
	}
	// 将数组转为字符串
	private static byteToString(arr: Array<number>) {
		let str: string = '';
		str = String.fromCharCode.apply(null, arr);
		return str;
	}
	private static stringToByte(str: string) {
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