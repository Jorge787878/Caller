function _getFilename(call) {
  if (call.usePath) {
    const segments = call.usePath.split(".");
    return segments[(segments.length || 1) - 1];
  }
  return call.file;
}

function onFailCall(params, call) {
  console.error(
    `Error: ${params.name} ${call.endPoint ? call.endPoint : params.url}`
  );
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

function createEndpoint(name, url, folder, calls) {
  const newEndpoint = {
    name,
    url,
    folder,
    calls: [],
  };

  const cals = calls?.length ? calls : [];

  cals.forEach((call) => {
    newEndpoint.calls.push({
      endPoint: call.endPoint ? `${url}/${call.endPoint}` : url,
      data: call.data || {},
      params: call.params || {},
      method: call.method || "get",
      onSucces: {
        create: {
          file: `${folder}/${name}/${_getFilename(call)}.json` || "",
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
