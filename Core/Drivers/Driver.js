class Driver {
    constructor(file) {
        this.content = file.content;
    }

    run(suite) {
        const forkEvents = JSON.parse(JSON.stringify(Unite.$events.list));
        Unite.$events.list = suite.events;
        this.beforeSuite(suite);
        suite.tests.forEach(item => {
            Unite.$emit("beforeEachTest");
            this.test(item);
            Unite.$emit("afterEachTest");
        });
        this.afterSuite(suite);
        Unite.$events.list = forkEvents;
    }

    test(item) {
        try {
            Unite.$report.tests++;
            item.test();
        } catch(e) {
            item.error = e;
            Unite.$report.errors.push(item);
        }
    }

    build() {
        return eval(this.content);
    }

    beforeSuite(suite) {
        //
    }

    afterSuite(suite) {
        //
    }
}

module.exports = Driver;