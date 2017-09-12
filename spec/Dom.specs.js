let Dom = require("../Core/Dom/JSDom");

describe("Dom unit tests.", function() {

    /** @test */
    it("It creates a global DOM", function() {
        expect(global.window).toBe(undefined);

        Dom.make();

        expect(window.constructor.name).toBe("Window");
    });

    /** @test */
    it("It destroys a global DOM", function() {
        expect(window.constructor.name).toBe("Window");

        Dom.destroy();

        expect(global.window).toBe(undefined);
    });

});
