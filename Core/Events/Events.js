let Module = require("../Contracts/Module");
let EventManager = require("./EventManager");

class Events extends Module {
    initialize() {
        this.unite.$events = new EventManager(this.unite);
        this.make();
    }

    make() {
        this.unite.$events.register("beforeCompilingEachSuite");
        this.unite.$events.register("afterCompilingEachSuite");
        this.unite.$events.register("beforeEachTest");
        this.unite.$events.register("afterEachTest");
    }

    destroy() {
        this.unite.$events.remove("beforeCompilingEachSuite");
        this.unite.$events.remove("afterCompilingEachSuite");
        this.unite.$events.remove("beforeEachTest");
        this.unite.$events.remove("afterEachTest");
    }
}

module.exports = Events;
