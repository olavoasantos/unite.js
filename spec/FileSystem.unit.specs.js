let path = require("path");
let fs = require("../Core/FileSystem/FileSystem");

describe("FileSystem unit tests.", function() {

    /** @test */
    it("It checks if a file exists", function() {
        let $existingPath = path.join(__dirname, "..", "README.md");
        let $nonExistingPath = path.join(__dirname, "..", "FILE NOT.FOUND");

        expect(fs.exists($existingPath)).toBe(true);
        expect(fs.exists($nonExistingPath)).toBe(false);
    });

    /** @test */
    it("It gets the root path for the current directory", function() {
        expect(fs.root).toBe(path.join(__dirname, ".."));
    });

    /** @test */
    it("It creates a new file", function() {
        let $path = path.join(fs.root, ".testFile");
        expect(fs.exists($path)).toBe(false);

        fs.set($path, "Test file content");

        expect(fs.exists($path)).toBe(true);
    });

    /** @test */
    it("It gets a file's content", function() {
        let $path = path.join(fs.root, ".testFile");
        expect(fs.exists($path)).toBe(true);

        let $file = fs.get($path);

        expect($file.content).toBe("Test file content");
    });

    /** @test */
    it("It deletes a file", async function() {
        let $path = path.join(fs.root, ".testFile");
        expect(fs.exists($path)).toBe(true);

        await fs.delete($path);

        expect(fs.exists($path)).toBe(false);
    });

});
