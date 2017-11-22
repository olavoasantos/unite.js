let Config = require("./Config/Config");

class Unite {

    constructor() {
        global.Unite = this;
        global.Element = function(){};
        this.$config = new Config;

        this.__initializeModules__();
        this.__registerEvents__();

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

    __registerEvents__() {
        this.$events.register("beforeCompilingEachSuite");
        this.$events.register("afterCompilingEachSuite");

        this.$events.register("beforeEachTest");
        this.$events.register("afterEachTest");

        this.$events.register("beforeSuite");
        this.$events.register("afterSuite");
    }

    __filter__(suites, filter) {
        return suites.filter(suite => {
            let suiteResponse = false;
            if(suite.name.indexOf(filter) > -1 || (suite.group && suite.group.indexOf(filter) > -1)) return true;

            suite.tests = suite.tests.filter(test => {
                let response = test.name.indexOf(filter) > -1;
                if(response) {
                    suiteResponse = true;
                    return response;
                }
            });

            return suiteResponse;
        });
    }

    run(filter = "") {
        var timer = process.hrtime();
        this.$report.header();
        this.$suites = this.$indexer.run();
        this.$compiler.run(this.$suites);

        this.$suites = this.__filter__(this.$suites, filter);

        this.$suites.forEach( suite => {
            suite.run();
        });

        this.$report.time(timer);
        this.$report.result();
    }
}

module.exports = Unite;
