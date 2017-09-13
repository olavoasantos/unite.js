let Config = require("./Config/Config");

class Unite {

    constructor() {
        this.$config = new Config;

        this.__initializeModules__();
    }

    __initializeModules__() {
        for(let data in this.$config.get.modules) {
            this[`$${data}`] = new this.$config.get.modules[data].module(
                this,
                this.$config.get.modules[data]
            );
            this[`$${data}`].initialize();
        }
    }

}

module.exports = Unite;
