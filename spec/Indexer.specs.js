let Indexer = require("../Core/Indexer/Indexer");

describe("Indexer unit tests:", function() {

    /** @test */
    it("It gets all the files from a given folder", function() {
        let indexer = new Indexer({
            "module": "IndexerModule",
            "path": "./spec/fakes/tests",
            "drivers": {
                ".tests.js": "DefaultDriver",
                ".tests.vue": "VueDriver"
            },
        });

        expect(indexer.files).toBeArray();
        expect(indexer.files).toBeArrayOfSize(3);
    });

    /** @test */
    it("It sets the right driver for the files", function() {
        let indexer = new Indexer({
            "module": "IndexerModule",
            "path": "./spec/fakes/tests",
            "drivers": {
                ".tests.js": "DefaultDriver",
                ".tests.vue": "VueDriver"
            }
        });

        expect(indexer.suites).toBeArrayOfSize(3);
        indexer.suites.forEach(suite => {
            if(suite.file.extension === ".vue") {
                expect(suite.driver).toEqual("VueDriver");
            } else {
                expect(suite.driver).toEqual("DefaultDriver");
            }
        })
    });

});
