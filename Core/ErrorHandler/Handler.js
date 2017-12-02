class Handler {
    static register(error, test = {}) {
        test.error = error;
        Unite.$report.errors.push(test);
    }
}
module.exports = Handler;