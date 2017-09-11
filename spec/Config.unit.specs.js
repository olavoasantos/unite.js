let fs = require("../Core/FileSystem/FileSystem");
let customConfig = fs.set(fs.fromRoot("unite.config.js"), JSON.stringify({"assertions": "jasmine"}, null, 2));

let config = require("../Core/Config/Config");

describe("Config unit tests.", function() {

    /** @test */
    it("It gets default config", function() {
        let configFile = fs.get(fs.fromRoot("Core/unite.config.js"));

        expect(
            config.default
        ).toEqual(
            JSON.parse(configFile.content, null, 2)
        );
    });

    /** @test */
    it("It gets custom config", function() {
        expect(
            config.custom
        ).toEqual(
            JSON.parse(customConfig.content, null, 2)
        );
    });

    /** @test */
    it("It assures that custom config overwrite default config", function() {
        expect(
            config.get.assertions
        ).toBe(
            "jasmine"
        );
    });

});

customConfig.delete();