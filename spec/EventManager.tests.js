let EventManager = require("../Core/Events/EventManager"), events;

describe("EventsManager unit tests:", function() {

    /** @test */
    it("It registers event on a given object", function() {
        let obj = {}; events = new EventManager(obj);
        events.register("nameOfTheEvent");

        expect(obj.nameOfTheEvent).toBeFunction();
    });

    /** @test */
    it("It registers a callback", function() {
        let obj = {}; events = new EventManager(obj);

        events.register("newEvent");
        expect(events.list["newEvent"]).toBeEmptyArray();

        obj.newEvent(() => {
            // Some logic to be run when newEvent is fired
        });

        expect(events.list["newEvent"]).toBeNonEmptyArray();
        expect(events.list["newEvent"][0]).toBeFunction();
    });

    /** @test */
    it("It registers a callback", function() {
        let obj = {}; events = new EventManager(obj);

        events.register("newEvent");
        obj.newEvent(() => { /* This will be removed */ });

        expect(events.list["newEvent"]).toBeNonEmptyArray();

        events.clear("newEvent");

        expect(events.list["newEvent"]).toBeEmptyArray();
    });

    /** @test */
    it("It calls registered callback on $emit", function() {
        let obj = {}; events = new EventManager(obj);
        let target = null;

        events.register("newEvent");
        obj.newEvent(() => { target = "Modified on $emit"; });

        expect(target).toBeNull();

        obj.$emit("newEvent");

        expect(target).toBe("Modified on $emit");
    });

    /** @test */
    it("It calls all registered callbacks in order on $emit", function() {
        let obj = {}; events = new EventManager(obj);
        let callbacks = [];

        events.register("newEvent");
        obj.newEvent(() => { callbacks.push("first"); });
        obj.newEvent(() => { callbacks.push("second"); });

        expect(callbacks).toBeEmptyArray();

        obj.$emit("newEvent");

        expect(callbacks).toBeNonEmptyArray();
        expect(callbacks[0]).toBe("first");
        expect(callbacks[1]).toBe("second");
    });

});
