const constantsGlobal = require("../constants/constants-global");
const coLog = require("./lib/colog");
const fsExtra = require("fs-extra");

function _getFilename(call) {
  if (call.createNewFileName) {
    return call.createNewFileName;
  } else if (call.usePath && call.usePath !== "data") {
    const segments = call.usePath.split(".");
    return segments[_getLastSegmentIdx(segments)];
  } else if (call.endPoint) {
    const endPointsSegments = call.endPoint.split("/");
    return endPointsSegments[_getLastSegmentIdx(endPointsSegments)];
  }
}

function _getLastSegmentIdx(segments) {
  return (segments.length || 1) - 1;
}

function createEndpointCallObj() {
  return {
    /** required */
    endPoint: "",
    body: {},
    params: {},
    /** Por defecto es "get" */
    method: constantsGlobal.METHODS.GET,
    createNewFileName: "",
    /** Path usado al recibir la response */
    usePath: "",
  };
}

function createEndpointObj() {
  return {
    name: "",
    url: "",
    /** Se creara dentro de la carpeta... */
    folder: "",
    headers: {},
    data: {},
    calls: [],
  };
}

function toAxiosParam(data, headers) {
  const axiosParam = createAxiosParam();
  axiosParam.method = data.method;
  axiosParam.url = data.endPoint;
  axiosParam.data = data.body;
  axiosParam.params = data.params;
  axiosParam.headers = headers;
  return axiosParam;
}

function onSuccesCallWriteData(response, call) {
  const stringedDataPrettified = JSON.stringify(
    getDataInPath(response, call.usePath, "."),
    null,
    2
  );

  fsExtra.createFileSync(call.createNewFileName);
  fsExtra.writeFileSync(call.createNewFileName, stringedDataPrettified);
}

function prepareEndpointCalls(data, headers) {
  data.folder.split("/")?.length > 1;

  data.calls.forEach((call) => {
    call.endPoint = data.url + (call.endPoint || "");
    call.targetFolder =
      data.folder.split("/")?.length > 1
        ? `${data.folder}`
        : `${data.folder}/${data.name}`;
    call.createNewFileName =
      `${call.targetFolder}/${_getFilename(call)}.json` || "";
    call.usePath = call.usePath ? "data." + call.usePath : "data";
    call.axiosParam = toAxiosParam(call, headers);
  });
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

function createAxiosParam() {
  return {
    method: constantsGlobal.METHODS.GET,
    headers: {},
    data: {},
    params: {},
    url: "",
  };
}

function checkObjItsFilled(obj) {
  if (!obj) {
    return false;
  }
  if (Array.isArray(obj) && Array.isArray(obj)?.length > 0) {
    return true;
  } else if (typeof obj === "object" && Object.keys(obj)?.length > 0) {
    return true;
  } else if (typeof obj === "string" && obj?.length > 0) {
    return true;
  } else if (typeof obj === "number") {
    return true;
  }
  return false;
}

function createFolders(pathUsed) {
  const paths = pathUsed.split("/");
  paths.shift();
  let pathToCreate = ".";
  paths.forEach((path) => {
    pathToCreate += `/${path}`;
    if (!fsExtra.existsSync(pathToCreate)) {
      fsExtra.mkdirSync(pathToCreate);
    }
  });
}

module.exports = {
  prepareEndpointCalls,
  getDataInPath,
  onSuccesCallWriteData,
  createNewConfig,
  createEndpointCallObj,
  createEndpointObj,
  coLog,
  createAxiosParam,
  toAxiosParam,
  checkObjItsFilled,
  createFolders,
};
