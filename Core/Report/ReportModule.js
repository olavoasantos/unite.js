let Module = require("../Contracts/Module");
let Report = require("../Report/Report");

class ReportModule extends Module {
    make() {
        this.unite.$report = new Report;
    }

    destroy() {
        delete this.unite.$report;
    }
}

module.exports = ReportModule;
