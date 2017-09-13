let Module = require("../Contracts/Module");
let EventManager = require("./EventManager");

class Events extends Module {
    initialize() {
        this.unite.$events = new EventManager(this.unite);
        this.make();
    }

    make() {
        this.unite.$events.register("beforeEachTest");
    }

    destroy() {
        this.unite.$events.remove("beforeEachTest");
    }
}

module.exports = Events;
