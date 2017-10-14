let path = require("path");

module.exports = {
    "modules": {
        "events": {
            "module": require(path.join(__dirname, "Events", "Events"))
        },
        "assertions": {
            "module": require(path.join(__dirname, "Assertions", "Chai"))
        },
        "dom": {
            "required": true,
            "module": require(path.join(__dirname, "Dom", "JSDom"))
        },
        "indexer": {
            "module": require(path.join(__dirname, "Indexer", "IndexerModule")),
            "path": "./tests",
            "drivers": {
                ".tests.js": "DefaultDriver",
                ".tests.vue": "VueDriver"
            }
        }
    }
}
