function _getFilename(call) {
  if (call.newFileName) {
    return call.newFileName;
  } else if (call.usePath && call.usePath !== "data") {
    const segments = call.usePath.split(".");
    return segments[(segments.length || 1) - 1];
  } else if (call.endPoint) {
    const endPointsSegments = call.endPoint.split("/");
    return endPointsSegments[(endPointsSegments.length || 1) - 1];
  }
}

function _createEndpointCallObj() {
  return {
    endPoint: "",
    data: {},
    params: {},
    method: "get",
    onSucces: {
      create: {
        newFileName: "",
      },
      usePath: "data",
    },
  };
}

function _createEndpointObj() {
  return {
    name: "",
    url: "",
    folder: "",
    headers: {},
    calls: [],
  };
}

function onSuccesCallWriteData(response, call) {
  const fsExtra = require("fs-extra");
  const stringedDataPrettified = JSON.stringify(
    getDataInPath(response, call.onSucces.usePath, "."),
    null,
    2
  );

  fsExtra.createFileSync(call.onSucces.create.newFileName);
  fsExtra.writeFileSync(
    call.onSucces.create.newFileName,
    stringedDataPrettified
  );
}

function createEndpoint(data, calls) {
  const newEndpoint = _createEndpointObj();

  newEndpoint.name = data.name;
  newEndpoint.url = data.url;
  newEndpoint.folder = data.folder;
  newEndpoint.headers = data.headers;

  const cals = calls?.length ? calls : [];

  cals.forEach((call) => {
    const endPointCall = _createEndpointCallObj();

    endPointCall.endPoint = data.url + (call.endPoint || "");
    endPointCall.data = call.data;
    endPointCall.params = call.params;
    endPointCall.method = call.method;
    endPointCall.onSucces.create.newFileName =
      `${data.folder}/${data.name}/${_getFilename(call)}.json` || "";
    endPointCall.onSucces.usePath = call.usePath
      ? "data." + call.usePath
      : "data";

    newEndpoint.calls.push(endPointCall);
  });

  return newEndpoint;
}

function getDataInPath(obj, path, separator = ".") {
  segments = path.split(separator);
  currentData = obj;

  segments.forEach((segment) => {
    currentData = currentData[segment];
  });

  return currentData;
}

function createNewConfig() {
  return {
    headers: {},
  };
}

module.exports = {
  createEndpoint,
  getDataInPath,
  onSuccesCallWriteData,
  createNewConfig,
};
