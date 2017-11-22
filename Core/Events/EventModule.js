let Module = require("../Contracts/Module");
let EventManager = require("./EventManager");

class EventModule extends Module {
    make() {
        this.unite.$events = new EventManager(this.unite);
    }

    destroy() {
        delete this.unite.$events;
    }
}

module.exports = EventModule;
