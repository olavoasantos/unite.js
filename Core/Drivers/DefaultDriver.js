class DefaultDriver {
    constructor(file) {
        this.file = file;
        this.content = file.content;
    }

    run(suite) {
        suite.tests.forEach(item => {
            item.test();
        });
    }

    build() {
        return eval(this.content);
    }
}

module.exports = DefaultDriver;