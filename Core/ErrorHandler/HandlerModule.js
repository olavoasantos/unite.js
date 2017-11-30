let Module = require("../Contracts/Module");

class HandlerModule extends Module {
    initialize() {
        this.consoleError = console.error;
        this.make();
    }
    make() {
        console.error = (...args) => {
            if(args[0].constructor.name.includes("Error")) throw args[0];

            return this.consoleError(...args);
        }

        process.on('unhandledRejection', (e) => {
            if(global.$test) {
                $test.error = e;
                this.unite.$report.errors.push($test);
            }
        });
    }

    destroy() {
        console.error = this.consoleError;
    }
}
module.exports = HandlerModule;