let path = require("path");

module.exports = {
    "drivers": {
        "*.tests.js": "DefaultDriver",
        "*.tests.vue": "VueDriver"
    },
    "modules": {
        "events": {
            "module": require(path.join(__dirname, "Events", "Events"))
        },
        "assertions": {
            "module": require(path.join(__dirname, "Assertions", "Chai"))
        },
        "dom": {
            "required": false,
            "module": require(path.join(__dirname, "Dom", "JSDom"))
        }
    }
}
