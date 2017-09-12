let FileSystem = require("../FileSystem/FileSystem");
let fs = new FileSystem;

class Config {
    constructor() {
        this.default = require(fs.fromCore("unite.config.js"));
        this.custom = this.getCustom();
    }

    get get() {
        return Object.assign({}, this.default, this.custom);
    }

    getCustom() {
        if(fs.exists(fs.fromRoot("unite.config.js"))) {
            return require(fs.fromRoot("unite.config.js"));
        }

        return Object.assign({}, this.default);
    }
}

module.exports = Config;
