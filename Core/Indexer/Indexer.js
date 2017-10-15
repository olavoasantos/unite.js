let FileSystem = require('../FileSystem/FileSystem');
let fs = new FileSystem;

class Indexer {
    constructor(config) {
        this.config = config;
        this.path = config.path;
        this.files = this.getFiles();
        this.suites = [];
    }

    getFiles() {
        return fs.getFromDir(fs.fromRoot(this.path));
    }

    run() {
        this.files.forEach(file => {
            let obj = {
                driver: "DefaultDriver",
                file: file
            };
            Object.keys(this.config.drivers).forEach(ext => {
                if(file.basename.endsWith(ext)) {
                    obj.driver = this.config.drivers[ext];
                }
            });

            this.suites.push(obj);
        });

        return this.suites;
    }
}

module.exports = Indexer;
