let Unite = require("../Core/Unite"), unite;
describe("Unite.js unit tests.", function() {

    /** @test */
    it("It runs events", function() {
        unite = new Unite;

        let target = null;
        unite.beforeEachTest(() => {
            target = "Modified";
        });

        expect(target).to.be.null;
        unite.$emit("beforeEachTest");
        expect(target).to.equal("Modified");
    });

    /** @test */
    it("It runs the Unite testcase", function() {
        unite = new Unite;
        unite.run();
    });

});
