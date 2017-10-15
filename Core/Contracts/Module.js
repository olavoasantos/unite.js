class Module {
    constructor($unite, $config = {}) {
        this.unite = $unite;
        this.config = $config;
    }

    initialize() {
        this.make();
    }

    make() {
        //
    }

    destroy() {
        //
    }
}

module.exports = Module;
