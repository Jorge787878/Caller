const aux = require("./functions/linker-aux");
const fns = require("./functions/index");

fns.store.repos = "C:/Users/jjcampoy/Documents/proyectos/vector/ilsa/repos";

fns.store.list = [
  aux.createLink(false, "web-b2c", repos),
  aux.createLink(false, "web-b2b", repos),
  aux.createLink(false, "web-component-slider", repos),
  aux.createLink(false, "web-component-header", repos),
  aux.createLink(false, "web-component-main-footer", repos),
  aux.createLink(false, "web-component-dinamic-footer", repos),
  aux.createLink(false, "web-component-main-search", repos),
];

fns.store.optionsExtra = {
  pathLibraryDist: fns.store.repos + "/ilsa-library/dist/ilsa-library",
  forAllMicrofrontends: {
    active: false,
    nodeModulesInstall: false,
    libraryLinkCreate: false,
    libraryForceUpdate: false,
  },
};
