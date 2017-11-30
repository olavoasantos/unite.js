let info = require("../../package.json");
let echo = require("console.echo");

class Report {

    constructor() {
        this.tests = 0;
        this.errors = [];
        this.assertions = 0;
    }

    header() {
        echo.line();
        echo.yellow.bold.left(`${info.name.charAt(0).toUpperCase() + info.name.slice(1)} - v${info.version}`);
        echo.left(`${info.author.name} - ${info.author.email}`);
        echo.line();
    }

    result() {
        if(this.errors.length > 0) {
            echo.lredBg.white.text(`  tests: ${this.tests} | assertions: ${this.assertions} | errors: ${this.errors.length}  `).break.break;
            this.printErrors();
        } else {
            echo.greenBg.text(`  tests: ${this.tests} | assertions: ${this.assertions}  `);
        }
        echo.line();
    }

    printErrors() {
        this.errors.forEach((item, count) => {
            if("matcherResult" in item.error) {
                let line = "=> line ";
                try {
                    let fullline = item.error.stack.match(/at.*test .*<anonymous>:(\d+):\d+\)|at Object.Unite.test .*<anonymous>:(\d+):\d+\)/);
                    line += fullline[1] || fullline[2];
                } catch(e) {
                    line = ""
                }
                let group = item.group ? ` : ${item.group} ` : " ";
                echo.redBg.white.text(`    ${count+1}) ${item.suite}${group}@ ${item.name} ${line}    `).break;
                echo.text(item.error.matcherResult.message()).break;
            } else {
                echo.redBg.white.text(`    ${count+1}) ${item.suite} @ ${item.name}    `).break;
                echo.text(item.error).break;
            }
            echo.line();
        });
    }

    throw(error) {
        echo.redBg.white.text(`    Whooops!! Something went wrong!    `).break;
        echo.text(error.message).break;
        echo.text(error.stack)
    }

    time(counter) {
        let time = process.hrtime(counter)[1] / 1000000;
        echo.text(`Finished in ${time} ms`).break;
    }

}

module.exports = Report;