const axios = require("axios");
const fsExtra = require("fs-extra");
const aux = require("../functions/auxiliars");

function callToEndPoint(params) {
  if (!fsExtra.existsSync(`${params.folder}`)) {
    fsExtra.mkdirSync(`${params.folder}`);
  }
  params.calls.forEach((call) => {
    fsExtra.removeSync(`${params.folder}/${params.name}`);
    fsExtra.mkdirSync(`${params.folder}/${params.name}`);

    axios[call.method](params.url, call.params)
      .then((res) => {
        fsExtra.createFileSync(call.onThen.create.file);
        fsExtra.writeFileSync(
          call.onThen.create.file,
          JSON.stringify(aux.getPath(res, call.onThen.usePath, "."), null, 2)
        );
      })
      .catch(() => {
        console.error("Error: " + params.name);
      });
  });
}

function callToEndPoints(endpoints) {
  endpoints.forEach((endpoint) => {
    callToEndPoint(endpoint);
  });
}

module.exports = {
  callToEndPoints,
};
