const axios = require("axios");
const fsExtra = require("fs-extra");
const aux = require("../functions/auxiliars");
const globalConfig = require("../config/global");

function callToEndPoint(preparedEndPoint) {
  if (!fsExtra.existsSync(preparedEndPoint.folder)) {
    fsExtra.mkdirSync(preparedEndPoint.folder);
  }

  preparedEndPoint.calls.forEach((call) => {
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
        const callData = call.usePath ? response[call.usePath] : response;
        let hasData = true;
        if (Array.isArray(callData) && Array.isArray(callData)?.length <= 0) {
          hasData = false;
        } else if (
          typeof callData === "object" &&
          Object.keys(callData)?.length <= 0
        ) {
          hasData = false;
        }
        aux.onSuccesCallWriteData(response, call);
        aux
          .coLog()
          [hasData ? "stateSuccess" : "stateWarning"](
            `${preparedEndPoint.name} ${call.endPoint}`
          );
      })
      .catch((error) => {
        aux.coLog().stateFail(`${preparedEndPoint.name} ${call.endPoint}`);
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
