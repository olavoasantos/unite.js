let FileSystem = require('../FileSystem/FileSystem');
let Suite = require("../Suite/Suite");
let fs = new FileSystem;

class Indexer {
    constructor(config) {
        this.suites = [];
        this.path = config.path;
    }

    run() {
        try {
            fs.getFiles(
                this.path,
                file => {
                    let suite = new Suite(file);
                    if(suite.isTestable) this.suites.push(suite);
                }
            );

            return this.suites;
        } catch (e) {
            Unite.$report.throw(e);
            process.exit();
        }
    }
}

module.exports = Indexer;
