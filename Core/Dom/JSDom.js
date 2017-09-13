let jsdom = require("jsdom").JSDOM;
let Module = require("../Contracts/Module");

class JSDom extends Module {
    initialize() {
        if(this.config.required) {
            this.make();
        }
    }

    make($html = "<body></body>") {
        global.window = (new jsdom($html)).window;
        global.document = window.document;
    }

    destroy() {
        delete global.window,
               global.document;
    }
}

module.exports = JSDom;
