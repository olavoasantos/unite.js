let fake = require("./fakes/Faker");
let fakeCustomConfig = fake.customConfig();

let path = require("path");

let $customPath = path.join(__dirname, "..", "unite.config.js");
let $defaultPath = path.join(__dirname, "..", "Core", "unite.config.js");

let defaultConfig = require($defaultPath);
let customConfig = require($customPath);

let Config = require("../Core/Config/Config");
let config = new Config;

describe("Config unit tests.", function() {

    /** @test */
    it("It gets default config", function() {
        expect(
            config.default
        ).toEqual(
            defaultConfig
        );
    });

    /** @test */
    it("It gets custom config", function() {
        expect(
            config.custom
        ).toEqual(
            customConfig
        );
    });

    /** @test */
    it("It assures that custom config overwrite default config", async function() {
        expect(
            config.get.modules.assertions.module.name
        ).toBe(
            "FakeModule"
        );
    });

});

fakeCustomConfig.delete();
