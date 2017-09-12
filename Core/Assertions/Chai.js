let chai = require('chai');
class Chai {
    static make() {
        global.assert = chai.assert;
        global.expect = chai.expect;
        global.should = chai.should;
    }

    static destroy() {
        delete global.assert, global.expect, global.should;
    }
}

module.exports = Chai;
