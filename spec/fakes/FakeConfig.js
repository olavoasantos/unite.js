let FileSystem = require("../../Core/FileSystem/FileSystem");
let fs = new FileSystem;

class FakeConfig {
    static make() {
        return [
            this.generate(),
            require(fs.fromCore("unite.config.js")),
            require(fs.fromRoot("unite.config.js"))
        ];
    }

    static generate() {
        return fs.set(
            fs.fromRoot("unite.config.js"),
            `module.exports = {
                modules: {
                    assertions: {
                        module: ${require(fs.fromCore("Contracts/Module"),)}
                    }
                }
            }`
        );
    }
}

module.exports = FakeConfig;
