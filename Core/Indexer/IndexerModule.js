let Indexer = require("./Indexer");
let Module = require("../Contracts/Module");

class IndexerModule extends Module {
    initialize() {
        if("path" in this.unite.$config.get) {
            this.config.path = this.unite.$config.get.path;
        }
        this.indexer = new Indexer(this.config);

        this.make();
    }

    make() {
        this.unite.$suites = this.indexer.suites;
    }

    destroy() {
        delete this.unite.$suites;
    }
}

module.exports = IndexerModule;
