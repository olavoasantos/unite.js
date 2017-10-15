let EventEmitter = require("events");

class EventManager {

    constructor(object) {
        this.list = {};
        this.forked = {};
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

            return this.object;
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

    fork(event) {
        this.forked[event] = JSON.parse(JSON.stringify(this.list));
    }

    rollback(event) {
        this.list = this.forked[event];
        delete this.forked[event];
    }

    all() {
        return this.list;
    }

    clear(events) {
        this.list[events] = [];
    }

}

module.exports = EventManager;
