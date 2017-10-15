let Indexer = require("./Indexer");
let Module = require("../Contracts/Module");

class IndexerModule extends Module {
    initialize() {
        this.config.path = this.unite.$config("path");
        this.config.drivers = this.unite.$config("drivers");
        this.indexer = new Indexer(this.config);

        this.make();
    }

    make() {
        this.unite.$indexer = this.indexer;
    }

    destroy() {
        delete this.unite.$indexer;
    }
}

module.exports = IndexerModule;
