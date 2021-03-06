let clone = require('../Cloner/Cloner');
let merge = require("deepmerge");
let path = require("path");

class Suite {
    constructor(file) {
        this.tests = [];
        this.errors = [];
        this.events = [];
        this.file = file;
        this.group = null;
        this.isTestable = false;
        this.isFinished = false;
        this.name = file.basename;
        this.driver = "DefaultDriver";

        this.setDriver();
    }

    setDriver() {
        for(let ext in Unite.$config("drivers")) {
            if(new RegExp(ext).test(this.name)) {
                let driverClass = require(path.join(__dirname, "../", "Drivers", Unite.$config("drivers")[ext]));
                this.driver = new driverClass(this.file);
                this.isTestable = true;
            }
        }
    }

    setEvents(events) {
        this.events = events;
    }

    compile() {
        Unite.__currentSuite__ = clone(this);
        eval(this.driver.setup);
        this.tests = merge(this.tests, Unite.__currentSuite__.tests);
        this.events = merge(this.events, Unite.__currentSuite__.events);
        Unite.__currentSuite__ = {};
    }

    run() {
        Unite.$events.scope("Suite", () => {
            Unite.$events.list = this.events;
            this.driver.beforeSuite(this);
            Unite.$emit("beforeSuite");
            this.tests.forEach(item => this.test(item));
            Unite.$emit("afterSuite");
            this.driver.afterSuite(this);
        });
    }

    test(item) {
        Unite.$emit("beforeEachTest");
        global.$test = merge({}, item);
        Unite.$report.tests++;
        item.run();
        Unite.$emit("afterEachTest");
    }
}
module.exports = Suite;