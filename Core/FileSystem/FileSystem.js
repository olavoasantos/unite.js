let fs = require("fs");
let path = require("path");
let File = require("./File");

class FileSystem {

    constructor() {
        this.root = this.getRoot();
    }

    getFiles(startPath, callback) {
        if (!fs.existsSync(startPath)){
            throw new Error(`Test path not found!`);
            return;
        }
    
        var files=fs.readdirSync(startPath);
        for(var i=0;i<files.length;i++){
            var filename=path.join(startPath,files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory()){
                this.getFiles(filename, callback); //recurse
            } else {
                callback(this.get(filename));
            }
        };
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

    delete($path) {
        fs.unlinkSync($path);
    }

    exists($path) {
        return fs.existsSync($path);
    }

    getFromDir($path) {
        return fs.readdirSync($path).map(file => {
            return new File(`${$path}/${file}`);
        });
    }

    fromCore($path) {
        return path.join(__dirname, "..", $path);
    }

    fromRoot($path) {
        return path.join(this.root, $path);
    }

    getRoot() {
        let $root = __dirname;

        while( !this.exists(path.join($root, "node_modules")) ) {
            $root = path.join($root, "..");
        }

        return $root;
    }

}

module.exports = FileSystem;
