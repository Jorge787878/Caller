function _getFilename(call) {
  if (call.usePath) {
    const segments = call.usePath.split(".");
    return segments[(segments.length || 1) - 1];
  }
  return call.file;
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
      endPoint: call.endPoint ? `${url}/${call.endPoint}` : "",
      params: call.params || {},
      method: call.method || "get",
      onThen: {
        create: {
          file: `${folder}/${name}/${_getFilename(call)}.json` || "",
        },
        usePath: call.usePath || "",
      },
    });
  });

  return newEndpoint;
}

function getPath(obj, path, separator = ".") {
  segments = path.split(separator);
  currentData = obj;

  segments.forEach((segment) => {
    currentData = currentData[segment];
  });

  return currentData;
}

module.exports = {
  createEndpoint,
  getPath,
};
