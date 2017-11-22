let Module = require("../Contracts/Module");
let clone = require('../Cloner/Cloner');

class TestGlobalsModule extends Module {
    make() {
        global.test = this.test;
        this.unite.test = this.test;
        global.group = this.group;
        this.unite.group = this.group;
    }

    destroy() {
        delete this.unite.test, global.test;
        delete this.unite.group, global.group;
    }

    group(name, suite) {
        let currentSuite = clone(Unite.__currentSuite__);

        Unite.__currentSuite__.group = name;
        Unite.__currentSuite__.tests = [];
        Unite.__currentSuite__.errors = [];
        Unite.__currentSuite__.events = Object.assign([], Unite.$events.list);
        suite();
        Unite.$suites.push(Unite.__currentSuite__);
        Unite.__currentSuite__ = clone(currentSuite);
    }

    test(name, test) {
        Unite.__currentSuite__.tests.push({
            suite: Unite.__currentSuite__.name,
            group: Unite.__currentSuite__.group,
            name: name,
            run: test,
            error: null
        });
    }
}

module.exports = TestGlobalsModule;
