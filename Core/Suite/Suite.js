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
        return new Promise((resolve, reject) => {
            this.driver.beforeSuite(this);
            Unite.$events.scope("Suite", () => {
                Unite.$events.list = this.events;
                Unite.$emit("beforeSuite");
                Promise.all(
                    this.tests.map(item => this.test(item))
                )
                .then(() => {
                    this.driver.afterSuite(this);
                    resolve();
                })
                .catch(e => {
                    this.driver.afterSuite(this);
                    reject(e);
                });
                Unite.$emit("afterSuite");
            });
        });
    }

    test(item) {
        Unite.$emit("beforeEachTest");
        global.$test = item;
        Unite.$report.tests++;
        return new Promise((resolve, reject) => {
            item.run(resolve, reject);
        })
        .then(() => {
            Unite.$emit("afterEachTest");          
        }).catch(e => {
            console.error(e);
        });
    }
}
module.exports = Suite;