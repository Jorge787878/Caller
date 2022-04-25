const constantsGlobal = require("../constants/constants-global");
const fsExtra = require("fs-extra");

const fnLog = (code, msg) => console.log(`\x1b[3${code}m` + msg + "\x1b[0m");

const log = {
  fail: (msg) => fnLog(1, "X " + msg),
  success: (msg) => fnLog(2, "✔ " + msg),
  warning: (msg) => fnLog(3, "! " + msg),
  info: (msg) => fnLog(4, "ℹ " + msg),
};

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

function createEndpointCallObj(obj) {
  return {
    endPoint: obj && obj.endPoint ? obj.endPoint : "",
    active: obj.active,
    body: obj && obj.body ? obj.body : {},
    params: obj && obj.params ? obj.params : {},
    method: obj && obj.method ? obj.method : constantsGlobal.METHODS.GET,
    createNewFileName:
      obj && obj.createNewFileName ? obj.createNewFileName : "",
    usePath: obj && obj.usePath ? obj.usePath : "",
  };
}

function createEndpointObj(obj) {
  return {
    name: obj && obj.name ? obj.name : "",
    url: obj && obj.url ? obj.url : "",
    active: obj && obj.active ? obj.active : false,
    /**  obj./** ||Se creara dentro de la carpeta... */
    keepInFolder: obj && obj.keepInFolder ? obj.keepInFolder : "",
    headers: obj && obj.headers ? obj.headers : {},
    data: obj && obj.data ? obj.data : {},
    calls: obj && obj?.calls?.length ? obj.calls : [],
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
  data.keepInFolder.split("/")?.length > 1;

  data.calls.forEach((call) => {
    call.endPoint = data.url + (call.endPoint || "");
    call.targetFolder =
      data.keepInFolder.split("/")?.length > 1
        ? `${data.keepInFolder}`
        : `${data.keepInFolder}/${data.name}`;
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

function createNewConfig(obj) {
  return {
    headers: obj && obj.headers ? obj.headers : {},
  };
}

function createAxiosParam(obj) {
  return {
    method: obj?.method || constantsGlobal.METHODS.GET,
    headers: obj && obj.headers ? obj.headers : {},
    data: obj && obj.data ? obj.data : {},
    params: obj && obj.params ? obj.params : {},
    url: obj?.url || "",
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
  log,
  createAxiosParam,
  toAxiosParam,
  checkObjItsFilled,
  createFolders,
};
