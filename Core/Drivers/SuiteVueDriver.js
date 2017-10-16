let Driver = require("./Driver");
let VueTestUtilModule = require("../Vue/VueTestUtilModule");
let vueTestUtilModule = new VueTestUtilModule(Unite);

class SuiteVueDriver extends Driver {

    constructor(file) {
        super(file);
        this.component = file.component;
    }

    beforeSuite(suite) {
        vueTestUtilModule.initialize();
        global.$component = this.component;
    }

    afterSuite(suite) {
        delete global.$component;
        vueTestUtilModule.destroy();
    }

    build() {
        this.content();
    }

}

module.exports = SuiteVueDriver;
