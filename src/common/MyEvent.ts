interface EventListenInterface {
	callBack: Function;
	thisObj: any;
}
class MyEvent {
	private static _inst: MyEvent;
	protected eventMap: any = {};
	static get instance(): MyEvent {
		if (!this._inst)
			this._inst = new MyEvent();
		return this._inst;
	}
	public static add(type: string, call: Function, thisObj: any) {
		MyEvent.instance.add(type, call, thisObj);
	}
	public static off(type?: string, call?: Function, thisObj?: any) {
		MyEvent.instance.off(type, call, thisObj);
	}
	public static dispach(type: string, args?: any) {
		MyEvent.instance.dispach(type, args);
	}
	/** 监听事件*/
	private add(type: string, call: Function, thisObj: any) {
		if (!this.eventMap[type])
			this.eventMap[type] = [];
		let evt = <EventListenInterface>{}
		evt.callBack = call;
		evt.thisObj = thisObj;
		this.eventMap[type].push(evt);
	}
	/** 移除监听*/
	private off(type?: string, call?: Function, thisObj?: any) {
		if (!type) {
			this.eventMap = {}; // 不带参直接清除所有监听
			return;
		}
		if (!call) {
			this.eventMap[type] = []; // 不带回掉直接清除同一事件的所有监听
			delete this.eventMap[type];
			return;
		}
		const arr = this.eventMap[type] as Array<EventListenInterface>;
		if (!thisObj || !arr)
			return;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].callBack == call && arr[i].thisObj == thisObj) {
				arr.splice(i, 1);
			}
		}
		if (!arr.length)
			delete this.eventMap[type];
	}
	private dispach(type: string, args?: any) {
		if (!this.eventMap[type] || !this.eventMap[type].length)
			return;
		const arr = this.eventMap[type] as Array<EventListenInterface>;
		for (let i = 0; i < arr.length; i++) {
			arr[i].callBack.call(arr[i].thisObj, args);
		}
	}
}