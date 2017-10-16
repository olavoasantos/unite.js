let Module = require("../Contracts/Module");

class TestGlobalsModule extends Module {
    make() {
        this.unite.test = this.test;
        this.unite.suite = this.suite;
    }

    destroy() {
        delete this.unite.test;
        delete this.unite.suite;
    }

    suite(name, suite) {
        const currentSuite = Object.assign({}, Unite.__currentSuite__);
        if(currentSuite.component !== undefined) {
            Unite.$suites.push(Unite.$compiler.compile(name, {content:suite,
                component: currentSuite.component,
            }, "SuiteVueDriver"));
        } else {
            Unite.$suites.push(Unite.$compiler.compile(name, {content:suite}, "SuiteDriver"));
        }
        Unite.__currentSuite__ = currentSuite;
    }

    test(name, test) {
        Unite.__currentSuite__.tests.push({suite: Unite.__currentSuite__.name, name: name, test: test});
    }
}

module.exports = TestGlobalsModule;
