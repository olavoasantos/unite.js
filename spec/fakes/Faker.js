let FileSystem = require("../../Core/FileSystem/FileSystem");
let fs = new FileSystem;

class Faker {
    static customConfig() {
        return fs.set(
            fs.fromRoot("unite.config.js"),
            `module.exports = {
                modules: {
                    assertions: {
                        module: ${require("./FakeModule")}
                    }
                }
            }`
        );
    }
}

module.exports = Faker;
