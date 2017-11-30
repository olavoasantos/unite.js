let Module = require("../Contracts/Module");
let sinon = require('sinon');

class SinonModule extends Module {
    make() {
        Unite.$sinon = sinon;
    }

    destroy() {
        delete Unite.$sinon;
    }
}

module.exports = SinonModule;
