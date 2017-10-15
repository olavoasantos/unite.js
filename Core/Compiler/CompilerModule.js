let Module = require("../Contracts/Module");
let Compiler = require("../Compiler/Compiler");

class CompilerModule extends Module {
    make() {
        this.unite.$compiler = new Compiler(this.unite);
    }

    destroy() {
        delete this.unite.$compiler;
    }
}

module.exports = CompilerModule;
