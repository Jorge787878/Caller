const cp = require("child_process");
const fsExtra = require("fs-extra");

// let emptyDir = fsExtra.emptyDirSync('./foo')
let readDir = fsExtra.readdirSync('./foo')

console.log(readDir)