let Driver = require("./Driver");
let VueTestUtilModule = require("../Vue/VueTestUtilModule");
let vueTestUtilModule = new VueTestUtilModule(Unite);

class VueDriver extends Driver {

    build(setup) {
        this.compile();
        this.setup = setup + this.tests;
    }

    beforeSuite() {
        vueTestUtilModule.initialize();
        global.$component = this.component;
    }

    afterSuite(suite) {
        delete global.$component;
        vueTestUtilModule.destroy();
    }

    compile() {
        this.tests = this.findByTag("tests", this.content);
        this.script = this.findByTag("script", this.content);
        this.template = this.findByTag("template", this.content);

        this.component = this.sanitize(this.script);
        this.component.template = this.template;
    }

    sanitize(script) {
        // remove ES6 imports
        if(script.includes("export default")) {
            script = script.replace("export default", "module.exports =");
        }

        return eval(script);
    }

    findByTag($tag, $content) {
        let $rgx = new RegExp("<" + $tag + ".*?>([\\s\\S]*?)<\\/" + $tag + ">", "g");
        let $match, $matches = [];
        while ($match = $rgx.exec($content)) {
            if ($match) {
                $matches.push($match[1]);
            }
        }

        return $matches[0];
    }

}

module.exports = VueDriver;
