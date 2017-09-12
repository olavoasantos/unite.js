let fs = require("../FileSystem/FileSystem");

class Config {
    constructor() {
        this.default = JSON.parse(fs.get(fs.fromRoot("Core/unite.config.js")).content);
        this.custom = this.getCustom();
    }

    get get() {
        return Object.assign({}, this.default, this.custom);
    }

    getCustom() {
        if(fs.exists(fs.fromRoot("unite.config.js"))) {
            return JSON.parse(fs.get(fs.fromRoot("unite.config.js")).content);
        }

        return Object.assign({}, this.default);
    }
}

module.exports = Config;
