class Driver {
    constructor(file) {
        this.setup = "";
        this.content = file.content;
    }

    build(setup) {
        this.setup = setup + this.content;
    }

    beforeSuite(suite) {
        //
    }

    afterSuite(suite) {
        //
    }
}

module.exports = Driver;