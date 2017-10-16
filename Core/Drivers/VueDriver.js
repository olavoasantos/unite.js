let Driver = require("./Driver");
let VueTestUtilModule = require("../Vue/VueTestUtilModule");
let vueTestUtilModule = new VueTestUtilModule(Unite);

class VueDriver extends Driver {

    beforeSuite(suite) {
        vueTestUtilModule.initialize();
        global.$component = suite.component;
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
        script = script.replace("export default", "module.exports = ");

        return eval(script);
    }

    build() {
        this.compile();
        Unite.__currentSuite__["component"] = this.component;
        eval(this.tests);
    }

    findByTag($tag, $content) {
        let $rgx = new RegExp("<" + $tag + ">([\\s\\S]*?)<\\/" + $tag + ">", "g");
        let $match, $matches = [];
        while ($match = $rgx.exec($content)) {
            if ($match) {
                $matches.push($match[1].replace(/\s\s+/g, ' ').trim());
            }
        }

        return $matches[0];
    }

}

module.exports = VueDriver;
