function _getFilename(call) {
  if (call.usePath) {
    const segments = call.usePath.split(".");
    return segments[(segments.length || 1) - 1];
  }
  return call.file;
}

function onSuccesCallWriteData(response, call) {
  const fsExtra = require("fs-extra");
  const stringedDataPrettified = JSON.stringify(
    getDataInPath(response, call.onSucces.usePath, "."),
    null,
    2
  );

  fsExtra.createFileSync(call.onSucces.create.file);
  fsExtra.writeFileSync(call.onSucces.create.file, stringedDataPrettified);
}

function createEndpoint(data, calls) {
  const newEndpoint = {
    name: data.name,
    url: data.url,
    folder: data.folder,
    calls: [],
  };

  const cals = calls?.length ? calls : [];

  cals.forEach((call) => {
    newEndpoint.calls.push({
      endPoint: call.endPoint ? `${data.url}/${call.endPoint}` : data.url,
      data: call.data || {},
      params: call.params || {},
      method: call.method || "get",
      onSucces: {
        create: {
          file: `${data.folder}/${data.name}/${_getFilename(call)}.json` || "",
        },
        usePath: call.usePath || "",
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
