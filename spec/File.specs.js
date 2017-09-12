let FileSystem = require("../Core/FileSystem/FileSystem");
let File = require("../Core/FileSystem/File");
let fs = new FileSystem;

let $file = fs.set(fs.fromRoot("newFile.txt"), "New file contents");

describe("File unit tests.", function() {

    /** @test */
    it("A file returns its path", function() {
        expect(
            $file.path
        ).toBe(
            fs.fromRoot("newFile.txt")
        );
    });

    /** @test */
    it("A file returns its name", function() {
        expect(
            $file.name
        ).toBe(
            "newFile"
        );
    });

    /** @test */
    it("A file returns its basename", function() {
        expect(
            $file.basename
        ).toBe(
            "newFile.txt"
        );
    });

    /** @test */
    it("A file returns its extension", function() {
        expect(
            $file.extension
        ).toBe(
            ".txt"
        );
    });

    /** @test */
    it("A file returns its contents", function() {
        expect(
            $file.content
        ).toBe(
            "New file contents"
        );
    });

    /** @test */
    it("A file can rename itself", function() {
        $file.rename("renamedFile.js");
        $file = new File($file.path);

        expect($file.extension).toBe(".js");
        expect($file.name).toBe("renamedFile");
        expect($file.basename).toBe("renamedFile.js");
        expect($file.content).toBe("New file contents");
        expect($file.path).toBe(fs.fromRoot("renamedFile.js"));
    });

    /** @test */
    it("A file can set its content", function() {
        $file.set("This content was set.");
        $file = new File($file.path);

        expect(
            $file.content
        ).toBe(
            "This content was set."
        );
    });

    /** @test */
    it("A file can append content", function() {
        $file.append(" Appended content");
        $file = new File($file.path);

        expect(
            $file.content
        ).toBe(
            "This content was set. Appended content"
        );
    });

    /** @test */
    it("A file can prepend content", function() {
        $file.prepend("Prepended content. ");
        $file = new File($file.path);

        expect(
            $file.content
        ).toBe(
            "Prepended content. This content was set. Appended content"
        );
    });

    /** @test */
    it("A file can delete itself", function() {
        let $path = $file.path;

        $file.delete();

        expect(fs.exists($path)).toBe(false);
    });

});
