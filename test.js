const cp = require("child_process");
const fsExtra = require("fs-extra");

// let emptyDir = fsExtra.emptyDirSync('./foo')
// let readDir = fsExtra.readdirSync('./foo')

// console.log(readDir)

// const params = {};

// let myArgs = process.argv.slice(2);
// myArgs.forEach((slug) => {
//   const partials = slug.split("=");
//   params[partials[0]] = partials[1];
// });

// console.log("myArgs: ", params);

function getCurrentBranchName() {
  return new Promise((resolve) => {
    cp.exec("git rev-parse --abbrev-ref HEAD", (error, stdout) => {
      resolve(stdout.trim());
    });
  });
}

getCurrentBranchName().then(a => console.log(a))
