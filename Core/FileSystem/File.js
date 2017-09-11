let fs = require("fs");
let path = require("path");

class File {
    constructor($path) {
        this.__getInfoFrom($path);
    }

    relativePath($path) {
        return path.relative($path, this.path);
    }

    rename($name) {
        let $path = path.join(this.directory, $name);
        fs.renameSync(this.path, $path);
        this.__getInfoFrom($path);

        return this;
    }

    async delete() {
        await fs.unlinkSync(this.path);

        delete this;
    }

    set($content) {
        var fd = fs.openSync(this.path, 'w');
        fs.writeSync(fd, $content);
        fs.closeSync(fd);

        this.content = $content;

        return this;
    }

    append($content) {
        $content = this.content + $content;
        this.set($content);

        return this;
    }

    prepend($content) {
        $content += this.content;
        this.set($content);

        return this;
    }

    __getInfoFrom($path) {
        this.path = $path;
        this.basename = path.basename($path);
        this.extension = path.extname($path);
        this.directory = path.dirname($path);
        this.content = fs.readFileSync($path, 'utf8');
        this.name = path.basename($path, this.extension);
    }
}

module.exports = File;
