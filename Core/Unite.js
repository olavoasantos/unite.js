let Config = require("./Config/Config");

class Unite {

    constructor() {
        this.config = new Config;
    }

    initAssertions() {
        this.assertions = require(this.config.get.assertions.package);
        this.assertions.make();
    }

    initDom() {
        if(this.config.get.dom.required) {
            this.dom = require(this.config.get.dom.package);
            this.dom.make();
        }
    }

}

module.exports = Unite;
