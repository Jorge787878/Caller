const cp = require("child_process");
const fsExtra = require("fs-extra");

// let emptyDir = fsExtra.emptyDirSync('./foo')
// let readDir = fsExtra.readdirSync('./foo')

// console.log(readDir)

function getCurrentBranchName() {
   return new Promise((resolve) => {
     cp.exec("git status", (error, stdout) => {
       let branchName = stdout.split(" ")[2];
       branchName = JSON.stringify(branchName);
       branchName = branchName.replace("\\nChanges", "");
       branchName = branchName.replace("\\nYour", "");
       resolve(branchName);
     });
   });
 }

 getCurrentBranchName().then(a => console.log(a))