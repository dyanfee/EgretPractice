var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CompressTool = (function () {
    function CompressTool() {
    }
    /**
     * 转码zigzag
     */
    CompressTool.encodeZigzag = function (n) {
        return (n << 1) ^ (n >> 15);
    };
    /**
     * 解码zigzag
     */
    CompressTool.decodeZigzag = function (n) {
        return (n >>> 1) ^ -(n & 1);
    };
    /**
     * 自字节表示长度
     * @param zigzag zigzag数字
     * @param 压缩后数组
     */
    CompressTool.writeToBuffer1 = function (zigzag, buf, size) {
        var ret = 0;
        for (var i = 0; i < size; i++) {
            if ((zigzag & (~0x3f)) == 0) {
                buf[i] = (zigzag | 0x40);
                ret = i + 1;
                break;
            }
            else {
                buf[i] = (zigzag & (0x3f) | 0xc0);
                zigzag = zigzag >> 6;
            }
        }
        return ret;
    };
    CompressTool.writeToBuffer = function (zigzag, buf, size) {
        var ret = 0;
        for (var i = 0; i < size; i++) {
            if ((zigzag & (~0x7f)) == 0) {
                buf[i] = zigzag;
                ret = i + 1;
                break;
            }
            else {
                buf[i] = (zigzag & (0x7f) | 0x80);
                zigzag = zigzag >> 7;
            }
        }
        return ret;
    };
    /**
     * 读取zigzag 数组
     */
    CompressTool.readFromBuffer = function (buf) {
        var data = 0;
        var ret = [];
        var offset = 0;
        var len = buf.length;
        for (var i = 0; i < len; i++) {
            var n = buf[i];
            if ((n & 0x80) != 0x80) {
                data |= (n << offset);
                ret.push(data);
                offset = 0;
                data = 0;
                // break;
            }
            else {
                data |= ((n & 0x7f) << offset);
                offset += 7;
            }
        }
        return ret;
    };
    CompressTool.readFromBuffer1 = function (buf) {
        var data = 0;
        var ret = [];
        var offset = 0;
        var len = buf.length;
        for (var i = 0; i < len; i++) {
            var n = (buf[i] ^ 0x40);
            if ((n & 0x80) != 0x80) {
                data |= (n << offset);
                ret.push(data);
                offset = 0;
                data = 0;
                // break;
            }
            else {
                data |= ((n & 0x3f) << offset);
                offset += 6;
            }
        }
        return ret;
    };
    /**
     * 将数值压缩为字符串
     * @param arr 数组number
     */
    CompressTool.setListValue = function (arr) {
        var dataStr = "";
        for (var i = 0; i < arr.length; i++) {
            if (typeof (arr[i]) != "number") {
                console.log("只能压缩数字!", arr[i]);
                return;
            }
            var zz = this.encodeZigzag(arr[i]);
            // 自定义字符长度
            var buf = new Array();
            this.writeToBuffer(zz, buf, 3);
            dataStr += this.byteToString(buf);
        }
        return dataStr;
    };
    CompressTool.setListValue1 = function (arr) {
        var dataStr = "";
        for (var i = 0; i < arr.length; i++) {
            if (typeof (arr[i]) != "number") {
                console.log("只能压缩数字!", arr[i]);
                return;
            }
            var zz = this.encodeZigzag(arr[i]);
            // 自定义字符长度
            var buf = new Array();
            this.writeToBuffer1(zz, buf, 3);
            dataStr += this.byteToString(buf);
        }
        return dataStr;
    };
    /**
     * 将字符串解压为数组
     */
    CompressTool.getListValue = function (str) {
        var ret = [];
        var list = this.stringToByte(str);
        var dataList = this.readFromBuffer(list);
        for (var i = 0; i < dataList.length; i++) {
            ret.push(this.decodeZigzag(dataList[i]));
        }
        return ret;
    };
    CompressTool.getListValue1 = function (str) {
        var ret = [];
        var list = this.stringToByte(str);
        var dataList = this.readFromBuffer1(list);
        console.log(dataList);
        for (var i = 0; i < dataList.length; i++) {
            ret.push(this.decodeZigzag(dataList[i]));
        }
        return ret;
    };
    // 将数组转为字符串
    CompressTool.byteToString = function (arr) {
        var str = '';
        str = String.fromCharCode.apply(null, arr);
        return str;
    };
    CompressTool.stringToByte = function (str) {
        var ch;
        var st;
        var re = [];
        for (var i = 0; i < str.length; i++) {
            ch = str.charCodeAt(i); // get char  
            st = []; // set up "stack"  
            do {
                st.push(ch & 0xFF); // push byte to stack
                ch = ch >> 8; // shift value down by 1 byte
            } while (ch);
            // add stack contents to result  
            // done because chars have "wrong" endianness  
            re = re.concat(st.reverse());
        }
        // return an array of bytes  
        return re;
    };
    return CompressTool;
}());
__reflect(CompressTool.prototype, "CompressTool");
//# sourceMappingURL=CompressTool.js.map