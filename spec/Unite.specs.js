let Unite = require("../Core/Unite"), unite;

describe("Unite.js unit tests.", function() {

    /** @test */
    it("It returns configurations", function() {
        unite = new Unite;
        expect(
            unite.config.constructor.name
        ).toBe("Config");
    });

    /** @test */
    it("It creates a DOM if config is set to true", function() {
        unite = new Unite;
        unite.config.custom.dom = unite.config.default.dom;
        unite.config.custom.dom.required = false;
        unite.initDom();
        expect(global.window).toBe(undefined);

        unite = new Unite;
        unite.config.custom.dom = unite.config.default.dom;
        unite.config.custom.dom.required = true;
        unite.initDom();
        expect(window.constructor.name).toBe("Window");
    });

    /** @test */
    it("It initiates assertions globally", function() {
        const $expect = expect;
        unite = new Unite;

        expect(global.assert).toBe(undefined);

        unite.initAssertions();

        expect(assert.constructor.name).to.be.equal("Function");
        unite.assertions.destroy();
        global.expect = $expect;
    });

});
