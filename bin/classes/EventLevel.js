"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 事件层
 */
class EventLevel {
    constructor(parent) {
        /**
         * 子层, key:子层名称
         */
        this.children = new Map();
        /**
         * 当前层的事件监听器
         */
        this.receivers = new Set();
        this.parent = parent;
    }
    getChildLevel(levelNameArray, autoCreateLevel) {
        let level = this;
        for (const currentName of levelNameArray) {
            let currentLevel = level.children.get(currentName);
            if (currentLevel === undefined) {
                if (autoCreateLevel) {
                    currentLevel = new EventLevel(level);
                    level.children.set(currentName, currentLevel);
                }
                else {
                    return undefined;
                }
            }
            level = currentLevel;
        }
        return level;
    }
}
exports.EventLevel = EventLevel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvRXZlbnRMZXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOztHQUVHO0FBQ0g7SUFnQkksWUFBWSxNQUFtQjtRQVYvQjs7V0FFRztRQUNNLGFBQVEsR0FBNEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUV2RDs7V0FFRztRQUNNLGNBQVMsR0FBa0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUcxQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBWUQsYUFBYSxDQUFDLGNBQXdCLEVBQUUsZUFBd0I7UUFDNUQsSUFBSSxLQUFLLEdBQWUsSUFBSSxDQUFDO1FBRTdCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sV0FBVyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFbkQsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLFlBQVksR0FBRyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNsRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3JCLENBQUM7WUFDTCxDQUFDO1lBRUQsS0FBSyxHQUFHLFlBQVksQ0FBQztRQUN6QixDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUFsREQsZ0NBa0RDIiwiZmlsZSI6ImNsYXNzZXMvRXZlbnRMZXZlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3RlbmVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvTGlzdGVuZXJUeXBlXCI7XHJcblxyXG4vKipcclxuICog5LqL5Lu25bGCXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRMZXZlbCB7XHJcbiAgICAvKipcclxuICAgICAqIOeItuWxguOAguagueeahOeItuWxguS4unVuZGVmaW5lZCAgIFxyXG4gICAgICovXHJcbiAgICByZWFkb25seSBwYXJlbnQ/OiBFdmVudExldmVsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a2Q5bGCLCBrZXk65a2Q5bGC5ZCN56ewXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IGNoaWxkcmVuOiBNYXA8c3RyaW5nLCBFdmVudExldmVsPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeWxgueahOS6i+S7tuebkeWQrOWZqFxyXG4gICAgICovXHJcbiAgICByZWFkb25seSByZWNlaXZlcnM6IFNldDxMaXN0ZW5lcj4gPSBuZXcgU2V0KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyZW50PzogRXZlbnRMZXZlbCkge1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55u45a+55b2T5YmN5bGC77yM5qC55o2u5bGC5ZCN56ew5pWw57uE6I635Y+W5a2Q5bGC77yM5aaC5p6c5LiN5a2Y5Zyo5bCx6L+U5Zue56m6XHJcbiAgICAgKiBAcGFyYW0gbGV2ZWxOYW1lQXJyYXkg5bGC5ZCN56ew5pWw57uEXHJcbiAgICAgKi9cclxuICAgIGdldENoaWxkTGV2ZWwobGV2ZWxOYW1lQXJyYXk6IHN0cmluZ1tdLCBhdXRvQ3JlYXRlTGV2ZWw6IGZhbHNlKTogRXZlbnRMZXZlbCB8IHVuZGVmaW5lZFxyXG4gICAgLyoqXHJcbiAgICAgKiDnm7jlr7nlvZPliY3lsYLvvIzmoLnmja7lsYLlkI3np7DmlbDnu4Tojrflj5blrZDlsYLvvIzlpoLmnpzkuI3lrZjlnKjlsLHoh6rliqjliJvlu7pcclxuICAgICAqIEBwYXJhbSBsZXZlbE5hbWVBcnJheSDlsYLlkI3np7DmlbDnu4RcclxuICAgICAqL1xyXG4gICAgZ2V0Q2hpbGRMZXZlbChsZXZlbE5hbWVBcnJheTogc3RyaW5nW10sIGF1dG9DcmVhdGVMZXZlbDogdHJ1ZSk6IEV2ZW50TGV2ZWxcclxuICAgIGdldENoaWxkTGV2ZWwobGV2ZWxOYW1lQXJyYXk6IHN0cmluZ1tdLCBhdXRvQ3JlYXRlTGV2ZWw6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgbGV2ZWw6IEV2ZW50TGV2ZWwgPSB0aGlzO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGN1cnJlbnROYW1lIG9mIGxldmVsTmFtZUFycmF5KSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50TGV2ZWwgPSBsZXZlbC5jaGlsZHJlbi5nZXQoY3VycmVudE5hbWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXV0b0NyZWF0ZUxldmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudExldmVsID0gbmV3IEV2ZW50TGV2ZWwobGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldmVsLmNoaWxkcmVuLnNldChjdXJyZW50TmFtZSwgY3VycmVudExldmVsKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV2ZWwgPSBjdXJyZW50TGV2ZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbGV2ZWw7XHJcbiAgICB9XHJcbn0iXX0=
