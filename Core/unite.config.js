let path = require("path");

module.exports = {
    "modules": {
        "dom": {
            "required": true,
            "module": require(path.join(__dirname, "Dom", "JSDom"))
        },
        "assertions": {
            "module": require(path.join(__dirname, "Assertions", "Chai"))
        }
    }
}
