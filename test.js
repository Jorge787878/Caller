const cp = require("child_process");

console.log('before', process.cwd());
// cp.execSync('cd..')
process.chdir("..")
console.log('after', process.cwd());