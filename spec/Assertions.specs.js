let assertions = require("../Core/Assertions/Chai");

describe("Assertions unit tests.", function() {

    /** @test */
    it("It creates global assertions", function() {
        const $expect = expect;
        expect(global.assert).toBe(undefined);

        Assertions = new assertions;
        Assertions.make();

        expect(assert.constructor.name).to.be.equal("Function");
        global.expect = $expect;
    });

    /** @test */
    it("It destroys global assertions", function() {
        const $expect = expect;
        expect(assert.constructor.name).toBe("Function");

        Assertions = new assertions;
        Assertions.destroy();

        expect(global.assert).toBe(undefined);
        global.expect = $expect;
    });

});

