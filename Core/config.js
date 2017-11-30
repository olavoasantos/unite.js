let path = require("path");

module.exports = {
    "path": "./tests",
    "drivers": {
        ".tests.js$": "DefaultDriver",
        ".specs.js$": "DefaultDriver",
        ".tests.vue$": "VueDriver",
        ".specs.vue$": "VueDriver"
    },
    "setup": [],
    "modules": {
        "errorHandler": {
            "module": require(path.join(__dirname, "ErrorHandler", "HandlerModule"))
        },
        "events": {
            "module": require(path.join(__dirname, "Events", "EventModule"))
        },
        "assertions": {
            "module": require(path.join(__dirname, "Assertions", "Expect"))
        },
        "dom": {
            "required": true,
            "module": require(path.join(__dirname, "Dom", "JSDom"))
        },
        "indexer": {
            "module": require(path.join(__dirname, "Indexer", "IndexerModule"))
        },
        "report": {
            "module": require(path.join(__dirname, "Report", "ReportModule"))
        },
        "compiler": {
            "module": require(path.join(__dirname, "Compiler", "CompilerModule"))
        },
        "testGlobals": {
            "module": require(path.join(__dirname, "TestGlobals", "TestGlobalsModule"))
        },
        "sinon": {
            "module": require(path.join(__dirname, "Helpers", "SinonModule"))
        },
    }
};
