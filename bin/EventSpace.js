"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventLevel_1 = require("./EventLevel");
function convertEventNameType(eventName = []) {
    if ('number' === typeof eventName)
        eventName = [eventName.toString()];
    else if ('string' === typeof eventName)
        eventName = eventName.split('.');
    else if (!Array.isArray(eventName))
        throw new Error('eventName must be a string or array');
    return eventName;
}
function receive(eventName, receiver) {
    if (typeof receiver !== 'function')
        throw new Error('receiver is not a function');
    eventName = convertEventNameType(eventName);
    this.eventLevel.addReceiver(eventName, receiver);
    return receiver;
}
function receiveOnce(eventName, receiver) {
    if (typeof receiver !== 'function')
        throw new Error('receiver is not a function');
    eventName = convertEventNameType(eventName);
    eventName.push(Math.random().toString());
    this.receive(eventName, function (d, p) {
        receiver(d, p);
        this.cancel(eventName);
    }.bind(this));
    return receiver;
}
function cancel(eventName) {
    eventName = convertEventNameType(eventName);
    this.eventLevel.removeReceiver(eventName);
}
function send(eventName, data, _this) {
    eventName = convertEventNameType(eventName);
    this.eventLevel.trigger(eventName, data, _this);
}
class EventSpace {
    constructor() {
        this.eventLevel = new EventLevel_1.default();
        this.EventSpace = EventSpace;
        this.on = this.receive = receive.bind(this);
        this.once = this.receiveOnce = receiveOnce.bind(this);
        this.off = this.cancel = cancel.bind(this);
        this.trigger = this.send = send.bind(this);
    }
}
exports.default = EventSpace;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkV2ZW50U3BhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBcUQ7QUFNckQsOEJBQThCLFlBQXFDLEVBQUU7SUFDakUsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLE9BQU8sU0FBUyxDQUFDO1FBQzlCLFNBQVMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssT0FBTyxTQUFTLENBQUM7UUFDbkMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFFM0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBU0QsaUJBQW1DLFNBQWtDLEVBQUUsUUFBa0I7SUFDckYsRUFBRSxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssVUFBVSxDQUFDO1FBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUVsRCxTQUFTLEdBQUcsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQVNELHFCQUF1QyxTQUFrQyxFQUFFLFFBQWtCO0lBQ3pGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sUUFBUSxLQUFLLFVBQVUsQ0FBQztRQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFFbEQsU0FBUyxHQUFHLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFFekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFNLEVBQUUsQ0FBYztRQUNwRCxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDZCxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFRRCxnQkFBa0MsU0FBa0M7SUFDaEUsU0FBUyxHQUFHLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFVRCxjQUFnQyxTQUFrQyxFQUFFLElBQVMsRUFBRSxLQUFhO0lBQ3hGLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFPRDtJQWNJO1FBWlMsZUFBVSxHQUFHLElBQUksb0JBQVUsRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFZN0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNKO0FBcEJELDZCQW9CQyIsImZpbGUiOiJFdmVudFNwYWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50TGV2ZWwsIHsgZXZlbnRuYW1lIH0gZnJvbSBcIi4vRXZlbnRMZXZlbFwiO1xyXG5cclxuLyoqXHJcbiAqIOi9rOaNouS6i+S7tuWQjeensOeahOexu+Wei1xyXG4gKiBAcGFyYW0ge2V2ZW50bmFtZSB8IGV2ZW50bmFtZVtdfSBldmVudE5hbWVcclxuICovXHJcbmZ1bmN0aW9uIGNvbnZlcnRFdmVudE5hbWVUeXBlKGV2ZW50TmFtZTogZXZlbnRuYW1lIHwgZXZlbnRuYW1lW10gPSBbXSk6IGV2ZW50bmFtZVtdIHtcclxuICAgIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIGV2ZW50TmFtZSkgICAgICAgICAgLy/lpoLmnpzmmK/mlbDlrZfnsbvlnovlsLHovazmjaLmiJDlrZfnrKbkuLJcclxuICAgICAgICBldmVudE5hbWUgPSBbZXZlbnROYW1lLnRvU3RyaW5nKCldO1xyXG4gICAgZWxzZSBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBldmVudE5hbWUpICAgICAvL+mqjOivgWV2ZW50TmFtZeeahOaVsOaNruexu+Wei1xyXG4gICAgICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS5zcGxpdCgnLicpO1xyXG4gICAgZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lKSlcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V2ZW50TmFtZSBtdXN0IGJlIGEgc3RyaW5nIG9yIGFycmF5Jyk7XHJcblxyXG4gICAgcmV0dXJuIGV2ZW50TmFtZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOazqOWGjOS6i+S7tuebkeWQrOWZqFxyXG4gKiDliKvlkI0gb25cclxuICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGV2ZW50TmFtZSDmjqXmlLbkuovku7bnmoTlkI3np7Au5Y+v5Lul5Li65a2X56ym5Liy5oiW5pWw57uEKOWtl+espuS4sumAmui/h+KAmC7igJnmnaXliIblibLlsYLnuqcpXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlY2VpdmVyIOaOpeaUtuWIsOS6i+S7tuWQjuaJp+ihjOeahOWbnuiwg+WHveaVsCAs5Zue6LCD5Ye95pWw5o6l5Y+X5Lik5Liq5Y+C5pWw77yIZGF0YTrmlbDmja7vvIxldmVudE5hbWU65LqL5Lu255qE5ZCN56ew5pWw57uE77yJXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSDov5Tlm54gcmVjZWl2ZXJcclxuICovXHJcbmZ1bmN0aW9uIHJlY2VpdmUodGhpczogRXZlbnRTcGFjZSwgZXZlbnROYW1lOiBldmVudG5hbWUgfCBldmVudG5hbWVbXSwgcmVjZWl2ZXI6IEZ1bmN0aW9uKSB7XHJcbiAgICBpZiAodHlwZW9mIHJlY2VpdmVyICE9PSAnZnVuY3Rpb24nKSAgLyrpqozor4HmlbDmja7nsbvlnosqL1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigncmVjZWl2ZXIgaXMgbm90IGEgZnVuY3Rpb24nKTtcclxuXHJcbiAgICBldmVudE5hbWUgPSBjb252ZXJ0RXZlbnROYW1lVHlwZShldmVudE5hbWUpO1xyXG5cclxuICAgIHRoaXMuZXZlbnRMZXZlbC5hZGRSZWNlaXZlcihldmVudE5hbWUsIHJlY2VpdmVyKTtcclxuICAgIHJldHVybiByZWNlaXZlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIOazqOWGjOWPquaOpeaUtuS4gOasoeeahOS6i+S7tuebkeWQrOWZqFxyXG4gKiDliKvlkI0gb25jZVxyXG4gKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0gZXZlbnROYW1lIOaOpeaUtuS6i+S7tueahOWQjeensC7lj6/ku6XkuLrlrZfnrKbkuLLmiJbmlbDnu4Qo5a2X56ym5Liy6YCa6L+H4oCYLuKAmeadpeWIhuWJsuWxgue6pylcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gcmVjZWl2ZXIg5o6l5pS25Yiw5pWw5o2u5ZCO5omn6KGM55qE5Zue6LCD5Ye95pWwICzlm57osIPlh73mlbDmjqXlj5fkuKTkuKrlj4LmlbDvvIhkYXRhOuaVsOaNru+8jGV2ZW50TmFtZTrkuovku7bnmoTlkI3np7DmlbDnu4TvvIlcclxuICogQHJldHVybiB7ZnVuY3Rpb259IOi/lOWbniByZWNlaXZlclxyXG4gKi9cclxuZnVuY3Rpb24gcmVjZWl2ZU9uY2UodGhpczogRXZlbnRTcGFjZSwgZXZlbnROYW1lOiBldmVudG5hbWUgfCBldmVudG5hbWVbXSwgcmVjZWl2ZXI6IEZ1bmN0aW9uKSB7XHJcbiAgICBpZiAodHlwZW9mIHJlY2VpdmVyICE9PSAnZnVuY3Rpb24nKSAgLyrpqozor4HmlbDmja7nsbvlnosqL1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigncmVjZWl2ZXIgaXMgbm90IGEgZnVuY3Rpb24nKTtcclxuXHJcbiAgICBldmVudE5hbWUgPSBjb252ZXJ0RXZlbnROYW1lVHlwZShldmVudE5hbWUpO1xyXG4gICAgZXZlbnROYW1lLnB1c2goTWF0aC5yYW5kb20oKS50b1N0cmluZygpKTsgIC8v56Gu5L+d5Y+q5Yig6Zmk6Ieq6LqrXHJcblxyXG4gICAgdGhpcy5yZWNlaXZlKGV2ZW50TmFtZSwgZnVuY3Rpb24gKGQ6IGFueSwgcDogZXZlbnRuYW1lW10pIHtcclxuICAgICAgICByZWNlaXZlcihkLCBwKTtcclxuICAgICAgICB0aGlzLmNhbmNlbChldmVudE5hbWUpO1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIHJldHVybiByZWNlaXZlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIOazqOmUgOaVsOaNruaOpeaUtuWZqFxyXG4gKiDliKvlkI0gb2ZmXHJcbiAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSBldmVudE5hbWUg5rOo6ZSA5LqL5Lu25o6l5pS25Zmo55qE5ZCN56ewLuWPr+S7peS4uuWtl+espuS4suaIluaVsOe7hCjlrZfnrKbkuLLpgJrov4figJgu4oCZ5p2l5YiG5Ymy5bGC57qnKVxyXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBjYW5jZWwodGhpczogRXZlbnRTcGFjZSwgZXZlbnROYW1lOiBldmVudG5hbWUgfCBldmVudG5hbWVbXSkge1xyXG4gICAgZXZlbnROYW1lID0gY29udmVydEV2ZW50TmFtZVR5cGUoZXZlbnROYW1lKTtcclxuICAgIHRoaXMuZXZlbnRMZXZlbC5yZW1vdmVSZWNlaXZlcihldmVudE5hbWUpO1xyXG59XHJcblxyXG4vKipcclxuICog6Kem5Y+R5oyH5a6a55qE5LqL5Lu25o6l5pS25ZmoXHJcbiAqIOWIq+WQjSB0cmlnZ2VyXHJcbiAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSBldmVudE5hbWUg6KaB6Kem5Y+R55qE5LqL5Lu25ZCN56ewLuWPr+S7peS4uuWtl+espuS4suaIluaVsOe7hCjlrZfnrKbkuLLpgJrov4figJgu4oCZ5p2l5YiG5Ymy5bGC57qnKVxyXG4gKiBAcGFyYW0gZGF0YSDopoHlj5HpgIHnmoTmlbDmja5cclxuICogQHBhcmFtIF90aGlzIOimgeS4uuebkeWQrOWZqOe7keWumueahHRoaXPlr7nosaFcclxuICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gKi9cclxuZnVuY3Rpb24gc2VuZCh0aGlzOiBFdmVudFNwYWNlLCBldmVudE5hbWU6IGV2ZW50bmFtZSB8IGV2ZW50bmFtZVtdLCBkYXRhOiBhbnksIF90aGlzOiBPYmplY3QpIHtcclxuICAgIGV2ZW50TmFtZSA9IGNvbnZlcnRFdmVudE5hbWVUeXBlKGV2ZW50TmFtZSk7XHJcbiAgICB0aGlzLmV2ZW50TGV2ZWwudHJpZ2dlcihldmVudE5hbWUsIGRhdGEsIF90aGlzKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDlr7lFdmVudExldmVs55qE566A5piT5bCB6KOFXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRTcGFjZSB7XHJcbiAgICAvL+WvvOWHuuS4gOS4quWFqOWxgOS6i+S7tuepuumXtOWSjOS4gOS4quS6i+S7tuepuumXtOexu1xyXG4gICAgcmVhZG9ubHkgZXZlbnRMZXZlbCA9IG5ldyBFdmVudExldmVsKCk7XHJcbiAgICByZWFkb25seSBFdmVudFNwYWNlID0gRXZlbnRTcGFjZTtcclxuXHJcbiAgICBvbjogKGV2ZW50TmFtZTogZXZlbnRuYW1lIHwgZXZlbnRuYW1lW10sIHJlY2VpdmVyOiBGdW5jdGlvbikgPT4gRnVuY3Rpb247XHJcbiAgICByZWNlaXZlOiAoZXZlbnROYW1lOiBldmVudG5hbWUgfCBldmVudG5hbWVbXSwgcmVjZWl2ZXI6IEZ1bmN0aW9uKSA9PiBGdW5jdGlvbjtcclxuICAgIG9uY2U6IChldmVudE5hbWU6IGV2ZW50bmFtZSB8IGV2ZW50bmFtZVtdLCByZWNlaXZlcjogRnVuY3Rpb24pID0+IEZ1bmN0aW9uO1xyXG4gICAgcmVjZWl2ZU9uY2U6IChldmVudE5hbWU6IGV2ZW50bmFtZSB8IGV2ZW50bmFtZVtdLCByZWNlaXZlcjogRnVuY3Rpb24pID0+IEZ1bmN0aW9uO1xyXG4gICAgb2ZmOiAoZXZlbnROYW1lOiBldmVudG5hbWUgfCBldmVudG5hbWVbXSkgPT4gdW5kZWZpbmVkO1xyXG4gICAgY2FuY2VsOiAoZXZlbnROYW1lOiBldmVudG5hbWUgfCBldmVudG5hbWVbXSkgPT4gdW5kZWZpbmVkO1xyXG4gICAgdHJpZ2dlcjogKGV2ZW50TmFtZTogZXZlbnRuYW1lIHwgZXZlbnRuYW1lW10sIGRhdGE6IGFueSwgX3RoaXM6IE9iamVjdCkgPT4gdW5kZWZpbmVkO1xyXG4gICAgc2VuZDogKGV2ZW50TmFtZTogZXZlbnRuYW1lIHwgZXZlbnRuYW1lW10sIGRhdGE6IGFueSwgX3RoaXM6IE9iamVjdCkgPT4gdW5kZWZpbmVkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMub24gPSB0aGlzLnJlY2VpdmUgPSByZWNlaXZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbmNlID0gdGhpcy5yZWNlaXZlT25jZSA9IHJlY2VpdmVPbmNlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vZmYgPSB0aGlzLmNhbmNlbCA9IGNhbmNlbC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudHJpZ2dlciA9IHRoaXMuc2VuZCA9IHNlbmQuYmluZCh0aGlzKTtcclxuICAgIH1cclxufSJdfQ==
