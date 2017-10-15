let Unite = require("../Core/Unite"), unite;
describe("Unite.js unit tests.", function() {

    /** @test */
    it("It runs events", function() {
        unite = new Unite;

        let target = null;
        unite.beforeEachTest(() => {
            target = "Modified";
        });

        expect(target).toBeNull();
        unite.$emit("beforeEachTest");
        expect(target).toEqual("Modified");
    });

    /** @test */
    it("It runs the Unite testcase", function() {
        unite = new Unite;
        unite.run();
    });

});
