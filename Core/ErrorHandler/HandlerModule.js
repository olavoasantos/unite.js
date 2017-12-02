let Module = require("../Contracts/Module");
let Handler = require("./Handler");
let merge = require("deepmerge");

class HandlerModule extends Module {
    initialize() {
        this.consoleError = console.error;
        this.make();
    }
    make() {
        this.unite.$error = {
            handler: Handler
        };

        console.error = (...args) => {
            if(args[0].constructor.name.includes("Error")) throw args[0];

            return this.consoleError(...args);
        }

        process.on('unhandledRejection', (e) => {
            if(global.$test) Handler.register(e, merge({}, global.$test));
        });
    }

    destroy() {
        console.error = this.consoleError;
    }
}
module.exports = HandlerModule;