let EventEmitter = require("events");

class EventManager {
    constructor(object) {
        this.list = {};
        this.emitter = new EventEmitter;

        this.object = object;
        this.object["$emit"] = (event) => {
            this.emitter.emit(event, event);
        };
    }

    remove(event) {
        delete this.list[event],
               this.object[event];
        this.emitter.removeAllListeners(event);
    }

    register(event) {
        this.list[event] = [];
        this.object[event] = this.addEventTo(event);

        this.emitter.on(event, (events)=> {
            this.list[events].forEach(event => {
                event();
            });
        });
    }

    addEventTo(event) {
        let events = this.list;
        return (callback) => {
            events[event].push(callback);
        }
    }

    clear(events) {
        this.list[events] = [];
    }
}

module.exports = EventManager;
