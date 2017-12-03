"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventLevel_1 = require("./EventLevel");
class EventSpace {
    constructor() {
        this._eventLevel = new EventLevel_1.EventLevel();
        this.receive = (eventName, listener) => {
            this._eventLevel
                .getChildLevel(EventSpace.convertEventNameType(eventName), true)
                .receivers.add(listener);
            return listener;
        };
        this.on = this.receive;
        this.receiveOnce = (eventName, listener) => {
            const level = this._eventLevel.getChildLevel(EventSpace.convertEventNameType(eventName), true);
            level.receivers.add(function once(data) {
                listener(data);
                level.receivers.delete(once);
            });
            return listener;
        };
        this.once = this.receiveOnce;
        this.cancel = (eventName = [], listener) => {
            const level = this._eventLevel.getChildLevel(EventSpace.convertEventNameType(eventName), false);
            if (level !== undefined)
                if (listener !== undefined)
                    level.receivers.delete(listener);
                else
                    level.receivers.clear();
        };
        this.off = this.cancel;
        this.cancelDescendants = (eventName = [], includeSelf = true) => {
            const level = this._eventLevel.getChildLevel(EventSpace.convertEventNameType(eventName), false);
            if (level !== undefined) {
                if (includeSelf)
                    level.receivers.clear();
                level.children.clear();
            }
        };
        this.offDescendants = this.cancelDescendants;
        this.cancelAncestors = (eventName = [], includeSelf = true) => {
            eventName = EventSpace.convertEventNameType(eventName);
            let level = this._eventLevel;
            for (var index = 0; index < eventName.length; index++) {
                level.receivers.clear();
                const currentLevel = level.children.get(eventName[index]);
                if (currentLevel !== undefined)
                    level = currentLevel;
                else
                    break;
            }
            if (includeSelf && index === eventName.length)
                level.receivers.clear();
        };
        this.offAncestors = this.cancelAncestors;
        this.trigger = (eventName, data, asynchronous) => {
            const level = this._eventLevel.getChildLevel(EventSpace.convertEventNameType(eventName), false);
            if (level !== undefined)
                level.receivers.forEach(item => asynchronous ? setTimeout(item, 0, data) : item(data));
        };
        this.send = this.trigger;
        this.triggerDescendants = (eventName, data, includeSelf = true, asynchronous) => {
            const level = this._eventLevel.getChildLevel(EventSpace.convertEventNameType(eventName), false);
            if (level !== undefined) {
                if (includeSelf)
                    level.receivers.forEach(item => asynchronous ? setTimeout(item, 0, data) : item(data));
                function triggerChildren(level) {
                    level.receivers.forEach(item => asynchronous ? setTimeout(item, 0, data) : item(data));
                    level.children.forEach(triggerChildren);
                }
                level.children.forEach(triggerChildren);
            }
        };
        this.sendDescendants = this.triggerDescendants;
        this.triggerAncestors = (eventName, data, includeSelf = true, asynchronous) => {
            eventName = EventSpace.convertEventNameType(eventName);
            let level = this._eventLevel;
            for (var index = 0; index < eventName.length; index++) {
                level.receivers.forEach(item => asynchronous ? setTimeout(item, 0, data) : item(data));
                const currentLevel = level.children.get(eventName[index]);
                if (currentLevel !== undefined)
                    level = currentLevel;
                else
                    break;
            }
            if (includeSelf && index === eventName.length)
                level.receivers.forEach(item => asynchronous ? setTimeout(item, 0, data) : item(data));
        };
        this.sendAncestors = this.triggerAncestors;
        this.has = (eventName, listener) => {
            const level = this._eventLevel.getChildLevel(EventSpace.convertEventNameType(eventName), false);
            if (level !== undefined) {
                if (listener !== undefined)
                    return level.receivers.has(listener);
                else
                    return level.receivers.size > 0;
            }
            else
                return false;
        };
        this.hasDescendants = (eventName, includeSelf = true) => {
            const level = this._eventLevel.getChildLevel(EventSpace.convertEventNameType(eventName), false);
            if (level !== undefined) {
                if (includeSelf && level.receivers.size > 0)
                    return true;
                function checkChildren(level) {
                    if (level.receivers.size > 0) {
                        return true;
                    }
                    else {
                        for (const item of level.children.values())
                            if (checkChildren(item))
                                return true;
                        return false;
                    }
                }
                for (const item of level.children.values())
                    if (checkChildren(item))
                        return true;
                return false;
            }
            else
                return false;
        };
        this.hasAncestors = (eventName, includeSelf = true) => {
            eventName = EventSpace.convertEventNameType(eventName);
            let level = this._eventLevel;
            for (var index = 0; index < eventName.length; index++) {
                if (level.receivers.size > 0)
                    return true;
                const currentLevel = level.children.get(eventName[index]);
                if (currentLevel !== undefined)
                    level = currentLevel;
                else
                    return false;
            }
            if (includeSelf)
                return level.receivers.size > 0;
            else
                return false;
        };
    }
    /**
     * 将事件名转换成数组的形式
     * @param eventName 事件名称
     */
    static convertEventNameType(eventName) {
        return Array.isArray(eventName) ? eventName : eventName.split('.');
    }
}
exports.EventSpace = EventSpace;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvRXZlbnRTcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDZDQUEwQztBQUUxQztJQUFBO1FBU3FCLGdCQUFXLEdBQUcsSUFBSSx1QkFBVSxFQUFFLENBQUM7UUFFaEQsWUFBTyxHQUFHLENBQXFCLFNBQTRCLEVBQUUsUUFBVztZQUNwRSxJQUFJLENBQUMsV0FBVztpQkFDWCxhQUFhLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQztpQkFDL0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU3QixNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3BCLENBQUMsQ0FBQTtRQUNELE9BQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRWxCLGdCQUFXLEdBQUcsQ0FBcUIsU0FBNEIsRUFBRSxRQUFXO1lBQ3hFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvRixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUk7Z0JBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZixLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFBO1FBQ0QsU0FBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFeEIsV0FBTSxHQUFHLENBQUMsWUFBK0IsRUFBRSxFQUFFLFFBQW1CO1lBQzVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO2dCQUNwQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDO29CQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUFDLElBQUk7b0JBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuRyxDQUFDLENBQUE7UUFDRCxRQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUVsQixzQkFBaUIsR0FBRyxDQUFDLFlBQStCLEVBQUUsRUFBRSxjQUF1QixJQUFJO1lBQy9FLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO29CQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3pDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUNELG1CQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBRXhDLG9CQUFlLEdBQUcsQ0FBQyxZQUErQixFQUFFLEVBQUUsY0FBdUIsSUFBSTtZQUM3RSxTQUFTLEdBQUcsVUFBVSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFFN0IsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQ3BELEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBRXhCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDO29CQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7Z0JBQUMsSUFBSTtvQkFBQyxLQUFLLENBQUM7WUFDckUsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDLE1BQU0sQ0FBQztnQkFBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNFLENBQUMsQ0FBQTtRQUNELGlCQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUVwQyxZQUFPLEdBQUcsQ0FBQyxTQUE0QixFQUFFLElBQVUsRUFBRSxZQUFzQjtZQUN2RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDaEcsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztnQkFDcEIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLFlBQVksR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRixDQUFDLENBQUE7UUFDRCxTQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVwQix1QkFBa0IsR0FBRyxDQUFDLFNBQTRCLEVBQUUsSUFBVSxFQUFFLGNBQXVCLElBQUksRUFBRSxZQUFzQjtZQUMvRyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDaEcsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQztvQkFBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUV4Ryx5QkFBeUIsS0FBaUI7b0JBQ3RDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3ZGLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDO2dCQUNELEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzVDLENBQUM7UUFDTCxDQUFDLENBQUE7UUFDRCxvQkFBZSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUUxQyxxQkFBZ0IsR0FBRyxDQUFDLFNBQTRCLEVBQUUsSUFBVSxFQUFFLGNBQXVCLElBQUksRUFBRSxZQUFzQjtZQUM3RyxTQUFTLEdBQUcsVUFBVSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFFN0IsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQ3BELEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRXZGLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDO29CQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7Z0JBQUMsSUFBSTtvQkFBQyxLQUFLLENBQUM7WUFDckUsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDLE1BQU0sQ0FBQztnQkFDMUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLFlBQVksR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRixDQUFDLENBQUE7UUFDRCxrQkFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUV0QyxRQUFHLEdBQUcsQ0FBQyxTQUE0QixFQUFFLFFBQW1CO1lBQ3BELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQztvQkFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJO29CQUNBLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDeEMsQ0FBQztZQUFDLElBQUk7Z0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN4QixDQUFDLENBQUE7UUFFRCxtQkFBYyxHQUFHLENBQUMsU0FBNEIsRUFBRSxjQUF1QixJQUFJO1lBQ3ZFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUV6RCx1QkFBdUIsS0FBaUI7b0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2hCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs0QkFDdkMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBRXpDLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ2pCLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUN2QyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFFekMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBQUMsSUFBSTtnQkFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3hCLENBQUMsQ0FBQTtRQUVELGlCQUFZLEdBQUcsQ0FBQyxTQUE0QixFQUFFLGNBQXVCLElBQUk7WUFDckUsU0FBUyxHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBRTdCLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUNwRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFFMUMsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzFELEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxTQUFTLENBQUM7b0JBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztnQkFBQyxJQUFJO29CQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDNUUsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQkFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQUMsSUFBSTtnQkFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3hFLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFoSkc7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFNBQTRCO1FBQ3BELE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Q0EwSUo7QUFqSkQsZ0NBaUpDIiwiZmlsZSI6ImNsYXNzZXMvRXZlbnRTcGFjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50U3BhY2VUeXBlIH0gZnJvbSAnLi8uLi9pbnRlcmZhY2VzL0V2ZW50U3BhY2VUeXBlJztcclxuaW1wb3J0IHsgTGlzdGVuZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL0xpc3RlbmVyVHlwZSc7XHJcbmltcG9ydCB7IEV2ZW50TGV2ZWwgfSBmcm9tIFwiLi9FdmVudExldmVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnRTcGFjZSBpbXBsZW1lbnRzIEV2ZW50U3BhY2VUeXBlIHtcclxuICAgIC8qKlxyXG4gICAgICog5bCG5LqL5Lu25ZCN6L2s5o2i5oiQ5pWw57uE55qE5b2i5byPXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIOS6i+S7tuWQjeensFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY29udmVydEV2ZW50TmFtZVR5cGUoZXZlbnROYW1lOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xyXG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGV2ZW50TmFtZSkgPyBldmVudE5hbWUgOiBldmVudE5hbWUuc3BsaXQoJy4nKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9ldmVudExldmVsID0gbmV3IEV2ZW50TGV2ZWwoKTtcclxuXHJcbiAgICByZWNlaXZlID0gPFQgZXh0ZW5kcyBMaXN0ZW5lcj4oZXZlbnROYW1lOiBzdHJpbmcgfCBzdHJpbmdbXSwgbGlzdGVuZXI6IFQpID0+IHtcclxuICAgICAgICB0aGlzLl9ldmVudExldmVsXHJcbiAgICAgICAgICAgIC5nZXRDaGlsZExldmVsKEV2ZW50U3BhY2UuY29udmVydEV2ZW50TmFtZVR5cGUoZXZlbnROYW1lKSwgdHJ1ZSlcclxuICAgICAgICAgICAgLnJlY2VpdmVycy5hZGQobGlzdGVuZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gbGlzdGVuZXI7XHJcbiAgICB9XHJcbiAgICBvbiA9IHRoaXMucmVjZWl2ZTtcclxuXHJcbiAgICByZWNlaXZlT25jZSA9IDxUIGV4dGVuZHMgTGlzdGVuZXI+KGV2ZW50TmFtZTogc3RyaW5nIHwgc3RyaW5nW10sIGxpc3RlbmVyOiBUKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGV2ZWwgPSB0aGlzLl9ldmVudExldmVsLmdldENoaWxkTGV2ZWwoRXZlbnRTcGFjZS5jb252ZXJ0RXZlbnROYW1lVHlwZShldmVudE5hbWUpLCB0cnVlKTtcclxuICAgICAgICBsZXZlbC5yZWNlaXZlcnMuYWRkKGZ1bmN0aW9uIG9uY2UoZGF0YSkge1xyXG4gICAgICAgICAgICBsaXN0ZW5lcihkYXRhKTtcclxuICAgICAgICAgICAgbGV2ZWwucmVjZWl2ZXJzLmRlbGV0ZShvbmNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xyXG4gICAgfVxyXG4gICAgb25jZSA9IHRoaXMucmVjZWl2ZU9uY2U7XHJcblxyXG4gICAgY2FuY2VsID0gKGV2ZW50TmFtZTogc3RyaW5nIHwgc3RyaW5nW10gPSBbXSwgbGlzdGVuZXI/OiBMaXN0ZW5lcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxldmVsID0gdGhpcy5fZXZlbnRMZXZlbC5nZXRDaGlsZExldmVsKEV2ZW50U3BhY2UuY29udmVydEV2ZW50TmFtZVR5cGUoZXZlbnROYW1lKSwgZmFsc2UpO1xyXG4gICAgICAgIGlmIChsZXZlbCAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXIgIT09IHVuZGVmaW5lZCkgbGV2ZWwucmVjZWl2ZXJzLmRlbGV0ZShsaXN0ZW5lcik7IGVsc2UgbGV2ZWwucmVjZWl2ZXJzLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICBvZmYgPSB0aGlzLmNhbmNlbDtcclxuXHJcbiAgICBjYW5jZWxEZXNjZW5kYW50cyA9IChldmVudE5hbWU6IHN0cmluZyB8IHN0cmluZ1tdID0gW10sIGluY2x1ZGVTZWxmOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxldmVsID0gdGhpcy5fZXZlbnRMZXZlbC5nZXRDaGlsZExldmVsKEV2ZW50U3BhY2UuY29udmVydEV2ZW50TmFtZVR5cGUoZXZlbnROYW1lKSwgZmFsc2UpO1xyXG4gICAgICAgIGlmIChsZXZlbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmNsdWRlU2VsZikgbGV2ZWwucmVjZWl2ZXJzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGxldmVsLmNoaWxkcmVuLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb2ZmRGVzY2VuZGFudHMgPSB0aGlzLmNhbmNlbERlc2NlbmRhbnRzO1xyXG5cclxuICAgIGNhbmNlbEFuY2VzdG9ycyA9IChldmVudE5hbWU6IHN0cmluZyB8IHN0cmluZ1tdID0gW10sIGluY2x1ZGVTZWxmOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xyXG4gICAgICAgIGV2ZW50TmFtZSA9IEV2ZW50U3BhY2UuY29udmVydEV2ZW50TmFtZVR5cGUoZXZlbnROYW1lKTtcclxuICAgICAgICBsZXQgbGV2ZWwgPSB0aGlzLl9ldmVudExldmVsO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgZXZlbnROYW1lLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXZlbC5yZWNlaXZlcnMuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRMZXZlbCA9IGxldmVsLmNoaWxkcmVuLmdldChldmVudE5hbWVbaW5kZXhdKTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRMZXZlbCAhPT0gdW5kZWZpbmVkKSBsZXZlbCA9IGN1cnJlbnRMZXZlbDsgZWxzZSBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbmNsdWRlU2VsZiAmJiBpbmRleCA9PT0gZXZlbnROYW1lLmxlbmd0aCkgbGV2ZWwucmVjZWl2ZXJzLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICBvZmZBbmNlc3RvcnMgPSB0aGlzLmNhbmNlbEFuY2VzdG9ycztcclxuXHJcbiAgICB0cmlnZ2VyID0gKGV2ZW50TmFtZTogc3RyaW5nIHwgc3RyaW5nW10sIGRhdGE/OiBhbnksIGFzeW5jaHJvbm91cz86IGJvb2xlYW4pID0+IHtcclxuICAgICAgICBjb25zdCBsZXZlbCA9IHRoaXMuX2V2ZW50TGV2ZWwuZ2V0Q2hpbGRMZXZlbChFdmVudFNwYWNlLmNvbnZlcnRFdmVudE5hbWVUeXBlKGV2ZW50TmFtZSksIGZhbHNlKTtcclxuICAgICAgICBpZiAobGV2ZWwgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgbGV2ZWwucmVjZWl2ZXJzLmZvckVhY2goaXRlbSA9PiBhc3luY2hyb25vdXMgPyBzZXRUaW1lb3V0KGl0ZW0sIDAsIGRhdGEpIDogaXRlbShkYXRhKSk7XHJcbiAgICB9XHJcbiAgICBzZW5kID0gdGhpcy50cmlnZ2VyO1xyXG5cclxuICAgIHRyaWdnZXJEZXNjZW5kYW50cyA9IChldmVudE5hbWU6IHN0cmluZyB8IHN0cmluZ1tdLCBkYXRhPzogYW55LCBpbmNsdWRlU2VsZjogYm9vbGVhbiA9IHRydWUsIGFzeW5jaHJvbm91cz86IGJvb2xlYW4pID0+IHtcclxuICAgICAgICBjb25zdCBsZXZlbCA9IHRoaXMuX2V2ZW50TGV2ZWwuZ2V0Q2hpbGRMZXZlbChFdmVudFNwYWNlLmNvbnZlcnRFdmVudE5hbWVUeXBlKGV2ZW50TmFtZSksIGZhbHNlKTtcclxuICAgICAgICBpZiAobGV2ZWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoaW5jbHVkZVNlbGYpIGxldmVsLnJlY2VpdmVycy5mb3JFYWNoKGl0ZW0gPT4gYXN5bmNocm9ub3VzID8gc2V0VGltZW91dChpdGVtLCAwLCBkYXRhKSA6IGl0ZW0oZGF0YSkpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdHJpZ2dlckNoaWxkcmVuKGxldmVsOiBFdmVudExldmVsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXZlbC5yZWNlaXZlcnMuZm9yRWFjaChpdGVtID0+IGFzeW5jaHJvbm91cyA/IHNldFRpbWVvdXQoaXRlbSwgMCwgZGF0YSkgOiBpdGVtKGRhdGEpKTtcclxuICAgICAgICAgICAgICAgIGxldmVsLmNoaWxkcmVuLmZvckVhY2godHJpZ2dlckNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXZlbC5jaGlsZHJlbi5mb3JFYWNoKHRyaWdnZXJDaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2VuZERlc2NlbmRhbnRzID0gdGhpcy50cmlnZ2VyRGVzY2VuZGFudHM7XHJcblxyXG4gICAgdHJpZ2dlckFuY2VzdG9ycyA9IChldmVudE5hbWU6IHN0cmluZyB8IHN0cmluZ1tdLCBkYXRhPzogYW55LCBpbmNsdWRlU2VsZjogYm9vbGVhbiA9IHRydWUsIGFzeW5jaHJvbm91cz86IGJvb2xlYW4pID0+IHtcclxuICAgICAgICBldmVudE5hbWUgPSBFdmVudFNwYWNlLmNvbnZlcnRFdmVudE5hbWVUeXBlKGV2ZW50TmFtZSk7XHJcbiAgICAgICAgbGV0IGxldmVsID0gdGhpcy5fZXZlbnRMZXZlbDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGV2ZW50TmFtZS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV2ZWwucmVjZWl2ZXJzLmZvckVhY2goaXRlbSA9PiBhc3luY2hyb25vdXMgPyBzZXRUaW1lb3V0KGl0ZW0sIDAsIGRhdGEpIDogaXRlbShkYXRhKSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TGV2ZWwgPSBsZXZlbC5jaGlsZHJlbi5nZXQoZXZlbnROYW1lW2luZGV4XSk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50TGV2ZWwgIT09IHVuZGVmaW5lZCkgbGV2ZWwgPSBjdXJyZW50TGV2ZWw7IGVsc2UgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5jbHVkZVNlbGYgJiYgaW5kZXggPT09IGV2ZW50TmFtZS5sZW5ndGgpXHJcbiAgICAgICAgICAgIGxldmVsLnJlY2VpdmVycy5mb3JFYWNoKGl0ZW0gPT4gYXN5bmNocm9ub3VzID8gc2V0VGltZW91dChpdGVtLCAwLCBkYXRhKSA6IGl0ZW0oZGF0YSkpO1xyXG4gICAgfVxyXG4gICAgc2VuZEFuY2VzdG9ycyA9IHRoaXMudHJpZ2dlckFuY2VzdG9ycztcclxuXHJcbiAgICBoYXMgPSAoZXZlbnROYW1lOiBzdHJpbmcgfCBzdHJpbmdbXSwgbGlzdGVuZXI/OiBMaXN0ZW5lcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxldmVsID0gdGhpcy5fZXZlbnRMZXZlbC5nZXRDaGlsZExldmVsKEV2ZW50U3BhY2UuY29udmVydEV2ZW50TmFtZVR5cGUoZXZlbnROYW1lKSwgZmFsc2UpO1xyXG4gICAgICAgIGlmIChsZXZlbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxldmVsLnJlY2VpdmVycy5oYXMobGlzdGVuZXIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGV2ZWwucmVjZWl2ZXJzLnNpemUgPiAwO1xyXG4gICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzRGVzY2VuZGFudHMgPSAoZXZlbnROYW1lOiBzdHJpbmcgfCBzdHJpbmdbXSwgaW5jbHVkZVNlbGY6IGJvb2xlYW4gPSB0cnVlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGV2ZWwgPSB0aGlzLl9ldmVudExldmVsLmdldENoaWxkTGV2ZWwoRXZlbnRTcGFjZS5jb252ZXJ0RXZlbnROYW1lVHlwZShldmVudE5hbWUpLCBmYWxzZSk7XHJcbiAgICAgICAgaWYgKGxldmVsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKGluY2x1ZGVTZWxmICYmIGxldmVsLnJlY2VpdmVycy5zaXplID4gMCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja0NoaWxkcmVuKGxldmVsOiBFdmVudExldmVsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwucmVjZWl2ZXJzLnNpemUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBsZXZlbC5jaGlsZHJlbi52YWx1ZXMoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrQ2hpbGRyZW4oaXRlbSkpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBsZXZlbC5jaGlsZHJlbi52YWx1ZXMoKSlcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja0NoaWxkcmVuKGl0ZW0pKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc0FuY2VzdG9ycyA9IChldmVudE5hbWU6IHN0cmluZyB8IHN0cmluZ1tdLCBpbmNsdWRlU2VsZjogYm9vbGVhbiA9IHRydWUpID0+IHtcclxuICAgICAgICBldmVudE5hbWUgPSBFdmVudFNwYWNlLmNvbnZlcnRFdmVudE5hbWVUeXBlKGV2ZW50TmFtZSk7XHJcbiAgICAgICAgbGV0IGxldmVsID0gdGhpcy5fZXZlbnRMZXZlbDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGV2ZW50TmFtZS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKGxldmVsLnJlY2VpdmVycy5zaXplID4gMCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TGV2ZWwgPSBsZXZlbC5jaGlsZHJlbi5nZXQoZXZlbnROYW1lW2luZGV4XSk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50TGV2ZWwgIT09IHVuZGVmaW5lZCkgbGV2ZWwgPSBjdXJyZW50TGV2ZWw7IGVsc2UgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluY2x1ZGVTZWxmKSByZXR1cm4gbGV2ZWwucmVjZWl2ZXJzLnNpemUgPiAwOyBlbHNlIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==
