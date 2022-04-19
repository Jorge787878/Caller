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

function coLog() {
  const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
  };

  return {
    color: {
      Reset: (msg) => {
        console.log(colors["Reset"], msg);
      },
      Bright: (msg) => {
        console.log(colors["Bright"], msg);
        console.log(colors["Reset"]);
      },
      Dim: (msg) => {
        console.log(colors["Dim"], msg);
        console.log(colors["Reset"]);
      },
      Underscore: (msg) => {
        console.log(colors["Underscore"], msg);
        console.log(colors["Reset"]);
      },
      Blink: (msg) => {
        console.log(colors["Blink"], msg);
        console.log(colors["Reset"]);
      },
      Reverse: (msg) => {
        console.log(colors["Reverse"], msg);
        console.log(colors["Reset"]);
      },
      Hidden: (msg) => {
        console.log(colors["Hidden"], msg);
        console.log(colors["Reset"]);
      },
      FgBlack: (msg) => {
        console.log(colors["FgBlack"], msg);
        console.log(colors["Reset"]);
      },
      FgRed: (msg) => {
        console.log(colors["FgRed"], msg);
        console.log(colors["Reset"]);
      },
      FgGreen: (msg) => {
        console.log(colors["FgGreen"], msg);
        console.log(colors["Reset"]);
      },
      FgYellow: (msg) => {
        console.log(colors["FgYellow"], msg);
        console.log(colors["Reset"]);
      },
      FgBlue: (msg) => {
        console.log(colors["FgBlue"], msg);
        console.log(colors["Reset"]);
      },
      FgMagenta: (msg) => {
        console.log(colors["FgMagenta"], msg);
        console.log(colors["Reset"]);
      },
      FgCyan: (msg) => {
        console.log(colors["FgCyan"], msg);
        console.log(colors["Reset"]);
      },
      FgWhite: (msg) => {
        console.log(colors["FgWhite"], msg);
        console.log(colors["Reset"]);
      },
      BgBlack: (msg) => {
        console.log(colors["BgBlack"], msg);
        console.log(colors["Reset"]);
      },
      BgRed: (msg) => {
        console.log(colors["BgRed"], msg);
        console.log(colors["Reset"]);
      },
      BgGreen: (msg) => {
        console.log(colors["BgGreen"], msg);
        console.log(colors["Reset"]);
      },
      BgYellow: (msg) => {
        console.log(colors["BgYellow"], msg);
        console.log(colors["Reset"]);
      },
      BgBlue: (msg) => {
        console.log(colors["BgBlue"], msg);
        console.log(colors["Reset"]);
      },
      BgMagenta: (msg) => {
        console.log(colors["BgMagenta"], msg);
        console.log(colors["Reset"]);
      },
      BgCyan: (msg) => {
        console.log(colors["BgCyan"], msg);
        console.log(colors["Reset"]);
      },
      BgWhite: (msg) => {
        console.log(colors["BgWhite"], msg);
        console.log(colors["Reset"]);
      },
      stateSuccess: (msg) => {
        console.log(colors["FgGreen"], "✔ Success:", msg);
        console.log(colors["Reset"]);
      },
      stateFail: (msg) => {
        console.log(colors["FgRed"], "💥 Fail:", msg);
        console.log(colors["Reset"]);
      },
    },
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
  coLog,
};
