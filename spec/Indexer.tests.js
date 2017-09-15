let Indexer = require("../Core/Indexer/Indexer");

describe("Indexer unit tests:", function() {

    /** @test */
    it("It gets all the files from a given folder", function() {
        let indexer = new Indexer({
            path: "./spec/fakes/tests"
        });

        expect(indexer.files).toBeArray();
        expect(indexer.files).toBeArrayOfSize(2);
    });

});
