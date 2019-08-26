var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var FollowDemo;
(function (FollowDemo) {
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            var _this = _super.call(this) || this;
            _this.test2();
            return _this;
        }
        /**
         * 转码zigzag
         */
        MainView.prototype.encodeZigzag = function (n) {
            return (n << 1) ^ (n >> 15);
        };
        MainView.prototype.decodeZigzag = function (n) {
            return (n >>> 1) ^ -(n & 1);
        };
        MainView.prototype.writeToBuffer = function (zigzag, buf, size) {
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
        MainView.prototype.readFromBuffer = function (buf, size) {
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
        MainView.prototype.test = function () {
            var n = [100, 100, 3423, 432, -111, -1000];
            var dataStr = '';
            // let n = [15, -100, 1000, -455, 10];
            for (var i = 0; i < n.length; i++) {
                // console.log("origin：", n[i]);
                // 转为zigzag编码
                var zz = this.encodeZigzag(n[i]);
                // this.log("zigzag:", zz);
                var temp = "";
                // 自定义字符长度
                var buf = new Array();
                this.writeToBuffer(zz, buf, 3);
                // console.log("buf:", buf);
                for (var i_1 = 0; i_1 < buf.length; i_1++) {
                    temp += this.fill(buf[i_1].toString(2)) + " ";
                }
                // console.log("tempStr:", temp);
                var data = this.byteToString(buf);
                dataStr += data;
                console.log("data:", data);
                // 解压
                var deBuf = this.stringToByte(data);
                // console.log("deBuf:", deBuf);
                var ret = this.readFromBuffer(buf, 3);
                // console.log("number:", this.decodeZigzag(ret));
            }
            console.log(dataStr);
        };
        MainView.prototype.test2 = function () {
            var n = [100, 100, 3423, 432, -111, -1000, 0, 1, -1];
            console.log(n);
            var dataStr = this.setListValue(n);
            console.log(dataStr);
            var ret = this.getListValue(dataStr);
            console.log(ret);
        };
        MainView.prototype.setListValue = function (arr) {
            var dataStr = "";
            for (var i = 0; i < arr.length; i++) {
                var zz = this.encodeZigzag(arr[i]);
                // 自定义字符长度
                var buf = new Array();
                this.writeToBuffer(zz, buf, 3);
                dataStr += this.byteToString(buf);
            }
            return dataStr;
        };
        MainView.prototype.getListValue = function (str) {
            var ret = [];
            var list = this.stringToByte(str);
            var dataList = this.readFromBuffer(list);
            for (var i = 0; i < dataList.length; i++) {
                ret.push(this.decodeZigzag(dataList[i]));
            }
            return ret;
        };
        MainView.prototype.fill = function (str, fill) {
            if (fill === void 0) { fill = 8; }
            var len = fill - str.length;
            for (var i = 0; i < len; i++) {
                str = "0" + str;
            }
            return str;
        };
        MainView.prototype.log = function (txt, n) {
            var a = n.toString(2);
            console.log(txt, this.fill(a));
        };
        // 将数组转为字符串
        MainView.prototype.byteToString = function (arr) {
            var str = '';
            str = String.fromCharCode.apply(null, arr);
            return str;
        };
        MainView.prototype.stringToByte = function (str) {
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
        return MainView;
    }(MyComponent));
    FollowDemo.MainView = MainView;
    __reflect(MainView.prototype, "FollowDemo.MainView");
})(FollowDemo || (FollowDemo = {}));
//# sourceMappingURL=MainView.js.map