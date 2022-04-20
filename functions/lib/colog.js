module.exports = function coLog() {
   const colors = {
     Reset: () => {
       console.log("\x1b[0m");
     },
     Bright: (msg) => {
       console.log("\x1b[1m", msg);
       colors.Reset();
     },
     Dim: (msg) => {
       console.log("\x1b[2m", msg);
       colors.Reset();
     },
     Underscore: (msg) => {
       console.log("\x1b[4m", msg);
       colors.Reset();
     },
     Blink: (msg) => {
       console.log("\x1b[5m", msg);
       colors.Reset();
     },
     Reverse: (msg) => {
       console.log("\x1b[7m", msg);
       colors.Reset();
     },
     Hidden: (msg) => {
       colors.Reset();
     },
 
     FgBlack: (msg) => {
       console.log("\x1b[30m", msg);
       colors.Reset();
     },
     FgRed: (msg) => {
       console.log("\x1b[31m", msg);
       colors.Reset();
     },
     FgGreen: (msg) => {
       console.log("\x1b[32m", msg);
       colors.Reset();
     },
     FgYellow: (msg) => {
       console.log("\x1b[33m", msg);
       colors.Reset();
     },
     FgBlue: (msg) => {
       console.log("\x1b[34m", msg);
       colors.Reset();
     },
     FgMagenta: (msg) => {
       console.log("\x1b[35m", msg);
       colors.Reset();
     },
     FgCyan: (msg) => {
       console.log("\x1b[36m", msg);
       colors.Reset();
     },
     FgWhite: (msg) => {
       console.log("\x1b[37m", msg);
       colors.Reset();
     },
 
     BgBlack: (msg) => {
       console.log("\x1b[40m", msg);
       colors.Reset();
     },
     BgRed: (msg) => {
       console.log("\x1b[41m", msg);
       colors.Reset();
     },
     BgGreen: (msg) => {
       console.log("\x1b[42m", msg);
       colors.Reset();
     },
     BgYellow: (msg) => {
       console.log("\x1b[43m", msg);
       colors.Reset();
     },
     BgBlue: (msg) => {
       console.log("\x1b[44m", msg);
       colors.Reset();
     },
     BgMagenta: (msg) => {
       console.log("\x1b[45m", msg);
       colors.Reset();
     },
     BgCyan: (msg) => {
       console.log("\x1b[46m", msg);
       colors.Reset();
     },
     BgWhite: (msg) => {
       console.log("\x1b[47m", msg);
       colors.Reset();
     },
     stateSuccess: (msg) => {
       colors.FgGreen("✔  " + msg);
     },
     stateWarning: (msg) => {
       colors.FgYellow("⚠  " + msg);
     },
     stateFail: (msg) => {
       colors.FgRed("💥 " + msg);
     },
   };
   return colors;
 }