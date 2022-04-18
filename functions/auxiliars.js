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
  const newEndpoint = {
    name: data.name,
    url: data.url,
    folder: data.folder,
    headers: data.headers || {},
    calls: [],
  };

  const cals = calls?.length ? calls : [];

  cals.forEach((call) => {
    newEndpoint.calls.push({
      endPoint: data.url + (call.endPoint || ""),
      data: call.data || {},
      params: call.params || {},
      method: call.method || "get",
      onSucces: {
        create: {
          newFileName:
            `${data.folder}/${data.name}/${_getFilename(call)}.json` || "",
        },
        usePath: call.usePath ? "data." + call.usePath : "data",
      },
    });
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

module.exports = {
  createEndpoint,
  getDataInPath,
  onSuccesCallWriteData,
};
