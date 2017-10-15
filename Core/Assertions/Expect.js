let expect = require('expect');
let Module = require("../Contracts/Module");

class Expect extends Module {
    make() {
        global.expect = (...args) => {
            Unite.$report.assertions++;
            return expect(...args);
        }
    }

    destroy() {
        delete global.expect;
    }
}

module.exports = Expect;
