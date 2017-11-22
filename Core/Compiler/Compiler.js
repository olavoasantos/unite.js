let path = require("path");
let fs = require("../FileSystem/FileSystem");
let File = new fs;

class Compiler {

    constructor(unite) {
        this.unite = unite;
        this.setup = this.getSetup();
    }

    run(suites) {
        return suites.map(suite => this.compile(suite));
    }

    compile(suite) {
        Unite.$events.scope("CompilingEachSuite", (events) => {
            suite.driver.build(this.setup);
            suite.events = events;
            suite.compile();
        });

        return suite;
    }

    getSetup() {
        let setup = "";
        this.unite.$config("setup").forEach(file => {
            let $file = File.get(file);
            setup += $file.content;
        });

        return setup;
    }

}

module.exports = Compiler;