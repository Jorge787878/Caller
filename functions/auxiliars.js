const constantsGlobal = require("../constants/constants-global");
const coLog = require("./lib/colog");
const fsExtra = require("fs-extra");

function _getFilename(call) {
  if (call.createNewFileName) {
    return call.createNewFileName;
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
  data.calls.forEach((call) => {
    call.endPoint = data.url + (call.endPoint || "");
    call.createNewFileName =
      `${data.folder}/${data.name}/${_getFilename(call)}.json` || "";
    call.usePath = call.usePath ? "data." + call.usePath : "data";
    call.axiosParam = toAxiosParam(call, headers);
    call.targetFolder = `${data.folder}/${data.name}`;
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
};
