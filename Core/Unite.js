let Config = require("./Config/Config");

class Unite {

    constructor() {
        global.Unite = this;
        global.Element = function(){};
        this.$config = new Config;

        this.__initializeModules__();

        this.__currentSuite__ = {};
        this.$suites = [];
    }

    __initializeModules__() {
        for(let data in this.$config("modules")) {
            let module = this.$config(`modules.${data}`);
            this[`$${data}`] = new module.module(this, module);
            this[`$${data}`].initialize();
        }
    }

    run() {
        let suites = this.$indexer.run();
        this.$compiler.run(suites);
        this.$suites.forEach(suite => {
            suite.driver.run(suite);
        });
        this.$report.generate();
    }
}

module.exports = Unite;
