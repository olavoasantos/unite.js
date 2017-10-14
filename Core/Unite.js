let Config = require("./Config/Config");
let path = require("path");
global.dd = (...args) => {
    console.log(...args);
    process.exit();
};
class Unite {

    constructor() {
        global.Unite = this;
        global.Element = function(){};
        this.$config = new Config;
        this.__initializeModules__();

        this.__currentSuite__ = {};
        this.__suites__ = {};
    }

    __initializeModules__() {
        for(let data in this.$config.get.modules) {
            this[`$${data}`] = new this.$config.get.modules[data].module(
                this,
                this.$config.get.modules[data]
            );
            this[`$${data}`].initialize();
        }
    }

    // Just got tired of taking it slowly... needs a lot of refactoring...

    run() {
        this.$suites.forEach(suite => {
            this.$emit("beforeCompilingEachSuite");
            this.__compileSuite__(suite);
            this.__suites__[suite.file.basename] = this.__currentSuite__;
            this.__currentSuite__ = {};
            this.$emit("afterCompilingEachSuite");
        });

        for(let suite in this.__suites__) {
            suite = this.__suites__[suite];
            suite.driver.run(suite);
        }
    }

    test(name, test) {
        this.__currentSuite__.tests.push({name: name, test: test});
    }

    __compileSuite__(suite) {
        this.__currentSuite__ = {
            driver: null,
            tests: [],
        };
        let driverClass = require(path.join(__dirname, "Drivers", suite.driver));
        let driver = new driverClass(suite.file);
        this.__currentSuite__.driver = driver;

        driver.build();
    }
}

module.exports = Unite;
