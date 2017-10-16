let echo = require("console.echo");

class Report {

    constructor() {
        this.tests = 0;
        this.errors = [];
        this.assertions = 0;
    }

    generate() {
        echo.yellow.bold.left("Unite.js - v0.0.1");
        echo.left("Olavo Amorim Santos - olavo.a.santos@gmail.com");
        echo.line();
        if(this.errors.length > 0) {
            echo.lredBg.white.text(`  tests: ${this.tests} | assertions: ${this.assertions} | errors: ${this.errors.length}  `).break.break;
            this.errors.forEach((item, count) => {
                echo.redBg.white.text(` ${count+1}) ${item.suite} @ ${item.name} `).break;
                if("matcherResult" in item.error) {
                    echo.text(item.error.matcherResult.message()).break;
                } else {
                    echo.text(item.error).break;
                }
                echo.line();
            });
        } else {
            echo.greenBg.text(`  tests: ${this.tests} | assertions: ${this.assertions}  `);
        }
    }

}

module.exports = Report;