let Driver = require("./Driver");

class SuiteDriver extends Driver {

    build() {
        this.content();
    }

}

module.exports = SuiteDriver;