let chai = require('chai');
let Module = require("../Contracts/Module");

class Chai extends Module {
    initialize() {
        this.make();
    }
    make() {
        global.assert = chai.assert;
        global.expect = chai.expect;
        global.should = chai.should;
    }

    destroy() {
        delete global.assert,
               global.expect,
               global.should;
    }
}

module.exports = Chai;
