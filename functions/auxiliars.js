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

function createEndpointCallObj() {
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

function createEndpointObj() {
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

function prepareEndpoint(data) {
  data.calls.forEach((call) => {
    call.endPoint = data.url + (call.endPoint || "");
    call.onSucces.create.newFileName =
      `${data.folder}/${data.name}/${_getFilename(call)}.json` || "";
    call.onSucces.usePath = call.usePath ? "data." + call.usePath : "data";
  });

  return data;
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
  prepareEndpoint,
  getDataInPath,
  onSuccesCallWriteData,
  createNewConfig,
  createEndpointCallObj,
  createEndpointObj,
};
