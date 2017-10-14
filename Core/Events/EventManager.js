let EventEmitter = require("events");

class EventManager {

    constructor(object) {
        this.list = {};
        this.initializeObject(object);
        this.emitter = new EventEmitter;
    }

    initializeObject(object) {
        this.object = object;
        this.object["$emit"] = (event) => {
            this.emitter.emit(event, event);
        };
    }

    register(event) {
        this.list[event] = [];
        this.object[event] = this.addEventTo(event);

        this.emitter.on(
            event,
            (events) => {
                this.list[events].forEach( event => event() );
            }
        );
    }

    addEventTo(event) {
        return (callback) => {
            this.list[event].push(callback);
        }
    }

    remove(event) {
        delete this.list[event],
               this.object[event];

        this.emitter.removeAllListeners(event);
    }

    getEvents(event) {
        return this.list[event];
    }

    clear(events) {
        this.list[events] = [];
    }

}

module.exports = EventManager;
