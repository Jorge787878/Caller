const axios = require("axios");
const fsExtra = require("fs-extra");
const aux = require("../functions/auxiliars");
const globalConfig = require("../config/global");

function callToEndPoint(preparedEndPoint) {
  if (!preparedEndPoint.active) {
    return;
  }
  aux.createFolders(preparedEndPoint.folder);

  preparedEndPoint.calls.forEach((call) => {
    if (!call.active) {
      return;
    }
    if (
      fsExtra.existsSync(call.targetFolder) &&
      globalConfig.deleteFilesBeforeCall
    ) {
      fsExtra.removeSync(call.targetFolder);
    }
    if (!fsExtra.existsSync(call.targetFolder)) {
      fsExtra.mkdirSync(call.targetFolder);
    }

    axios(call.axiosParam)
      .then((response) => {
        const callData = aux.getDataInPath(response, call.usePath);
        const hasData = aux.checkObjItsFilled(callData);

        aux.onSuccesCallWriteData(response, call);
        const stateMsg = hasData ? aux.log.success : aux.log.warning;
        stateMsg(`${preparedEndPoint.name} ${call.endPoint}`);
      })
      .catch((error) => {
        aux.log.fail(`${preparedEndPoint.name} ${call.endPoint} ${call.usePath}`);
      });
  });
}

function callToEndPoints(endpoints, config) {
  endpoints.forEach((endpoint) => {
    aux.prepareEndpointCalls(endpoint, config.headers);
    callToEndPoint(endpoint, config);
  });
}

module.exports = {
  callToEndPoints,
};
