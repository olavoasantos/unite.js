let Suite = require("../Suite/Suite");
let merge = require("deepmerge");

module.exports = (suite) => {
    let currentSuite = Object.create(suite);
    currentSuite.tests = Object.assign([], suite.tests);
    currentSuite.errors = Object.assign([], suite.errors);
    currentSuite.events = merge([], suite.events);
    currentSuite.file = suite.file;
    currentSuite.group = suite.group;
    currentSuite.isTestable = suite.isTestable;
    currentSuite.name = suite.name;
    currentSuite.driver = suite.driver;

    return currentSuite
}