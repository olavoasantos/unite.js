#! /usr/bin/env node

let Unite = require("../Core/Unite");
let [,,filter] = process.argv;

(new Unite).run(filter);
