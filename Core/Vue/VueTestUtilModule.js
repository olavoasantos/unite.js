let VueTestUtil = require("vue-test-utils");
let Module = require("../Contracts/Module");

class VueTestUtilModule extends Module {
    make() {
        this.unite.$vueTestUtil = VueTestUtil;
        this.unite.$mount = VueTestUtil.mount;
        this.unite.$shallow = VueTestUtil.shallow;
        this.unite.$createLocalVue = VueTestUtil.createLocalVue;
        this.unite.$transitionStub = VueTestUtil.TransitionStub;
        this.unite.$transitionGroupStub = VueTestUtil.TransitionGroupStub;
    }

    destroy() {
        delete this.unite.$mount;
        delete this.unite.$shallow;
        delete this.unite.$vueTestUtil;
        delete this.unite.$createLocalVue;
        delete this.unite.$TransitionStub;
        delete this.unite.$TransitionGroupStub;
    }
}

module.exports = VueTestUtilModule;