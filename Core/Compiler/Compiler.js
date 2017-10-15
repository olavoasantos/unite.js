let path = require("path");

class Compiler {

    constructor(unite) {
        this.unite = unite;
    }

    run(suites) {
        suites.forEach(suite => {
            this.unite.$suites.push(this.compile(suite.file.basename, suite.file, suite.driver));
        });
    }

    compile(name, suite, driverName) {
        this.unite.$emit("beforeCompilingEachSuite");
        this.unite.__currentSuite__ = {
            name: name,
            driver: null,
            tests: [],
            events: [],
        };
        let driverClass = require(path.join(__dirname, "../", "Drivers", driverName));
        this.unite.__currentSuite__.driver = new driverClass(suite);
        let label = Math.random().toString(36).substring(7);
        this.unite.$events.fork(label);
        this.unite.__currentSuite__.driver.build();
        this.unite.__currentSuite__.events = this.unite.$events.list;
        this.unite.$events.rollback(label);
        let compiled = Object.assign({}, this.unite.__currentSuite__);
        this.__currentSuite__ = {};
        this.unite.$emit("afterCompilingEachSuite");

        return compiled;
    }

}

module.exports = Compiler;