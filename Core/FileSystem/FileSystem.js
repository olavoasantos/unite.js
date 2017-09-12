let fs = require("fs");
let path = require("path");
let File = require("./File");

class FileSystem {

    constructor() {
        this.root = this.getRoot();
    }

    get($path) {
        return new File($path);
    }

    set($path, $content) {
        var fd = fs.openSync($path, 'w');
        fs.writeSync(fd, $content);
        fs.closeSync(fd);

        return new File($path);
    }

    async delete($path) {
        await fs.unlinkSync($path);
    }

    exists($path) {
        return fs.existsSync($path);
    }

    fromCore($path) {
        return path.join(__dirname, "..", $path);
    }

    fromRoot($path) {
        return path.join(this.root, $path);
    }

    getRoot() {
        let $root = __dirname;

        while( !this.exists(path.join($root, "node_modules")) ) $root = path.join($root, "..");

        return $root;
    }

}

module.exports = FileSystem;
