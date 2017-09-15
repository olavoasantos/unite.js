let fs = require("fs");
let path = require("path");

let FileSystem = require("../../Core/FileSystem/FileSystem");
let fileSystem = new FileSystem;

class Factory {
    static async suites(dir, count = 1) {
        let files = [], file;
        for(let i = 0; i < count; i++) {
            file = await this.makeFile(
                    fileSystem.fromRoot(`${dir}/test${i}.test.js`),
                    `test("It tests something awesome", () => {\n\tassert.equal(${i}, ${i});\n});\n`
                );
            files.push(
                file
            );
        }

        return files;
    }

    static async makeFile($path, $content) {

        await fs.writeFile($path, $content, function(err) {
            if(err) throw new Error(err);
        });

        return fileSystem.get($path);
    }
}

module.exports = Factory;
