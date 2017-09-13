let dom = require("../Core/Dom/JSDom");

describe("Dom unit tests.", function() {

    /** @test */
    it("It creates a global DOM", function() {
        expect(global.window).toBe(undefined);

        Dom = new dom;
        Dom.make();

        expect(window.constructor.name).toBe("Window");
    });

    /** @test */
    it("It destroys a global DOM", function() {
        expect(window.constructor.name).toBe("Window");

        Dom = new dom;
        Dom.destroy();

        expect(global.window).toBe(undefined);
    });

    /** @test */
    it("It doesn't create a global DOM if not required", function() {
        expect(global.window).toBe(undefined);

        Dom = new dom({}, {
            required: false,
            module: "../Core/Dom/JSDom"
        });
        Dom.initialize();

        expect(global.window).toBe(undefined);
    });

    /** @test */
    it("It creates a global DOM if required", function() {
        expect(global.window).toBe(undefined);

        Dom = new dom({}, {
            required: true,
            module: "../Core/Dom/JSDom"
        });
        Dom.initialize();

        expect(window.constructor.name).toBe("Window");
        Dom.destroy();
    });

});
