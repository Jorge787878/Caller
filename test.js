const fsExtra = require("fs-extra");
const cp = require("child_process");

fnLog = (code, msg) => console.log(`\x1b[3${code}m` + msg + "\x1b[0m");
const log = {
  fail: (msg) => fnLog(1, "X " + msg),
  success: (msg) => fnLog(2, "✔ " + msg),
  warning: (msg) => fnLog(3, "! " + msg),
  info: (msg) => fnLog(4, "ℹ " + msg),
};

log.info('Hola estoy aqui')
log.success('Ha funcionado')
log.warning('Algo no esta saliendo bien')
log.fail('Errores')
