let Unite = require("../Core/Unite");

let unite = new Unite;

describe("Unite.js unit tests.", function() {

    /** @test */
    it("It returns configurations", function() {
        expect(
            unite.config.constructor.name
        ).toBe("Config");
    });

});
