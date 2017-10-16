let FileSystem = require("../FileSystem/FileSystem");
let merge = require('deepmerge');
let fs = new FileSystem;

class Config {
    constructor() {
        return this.fetcher();
    }

    fetcher() {
        this.custom = this.getCustom();
        this.default = require(fs.fromCore("unite.config.js"));
        let node = merge(this.default, this.custom);

        return (path) => {
            if(!path) return node;
            let value = node;
            for(let key of path.split(".")) {
                if(key in value) {
                    value = value[key];
                } else {
                    return path;
                }
            }

            return value;
        }
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
