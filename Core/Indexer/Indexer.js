let FileSystem = require('../FileSystem/FileSystem');
let fs = new FileSystem;

class Indexer {
    constructor(config) {
        this.files = fs.getFromDir(fs.fromRoot(config.path));
    }
}

module.exports = Indexer;
