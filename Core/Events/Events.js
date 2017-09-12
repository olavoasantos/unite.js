let Module = require("../Contracts/Module");
let EventManager = require("./EventManager");

class Events extends Module {
    static initialize($config, $unite) {
        $unite.$events = new EventManager($unite);
        this.make($unite);
    }

    static make($unite) {
        $unite.$events.register("beforeEachTest");
    }

    static destroy($unite) {
        $unite.$events.remove("beforeEachTest");
    }
}

module.exports = Events;
