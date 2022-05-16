const aux = require("./functions/linker-aux");
const fns = require("./functions/index");

fns.store.repos = "C:/Users/jjcampoy/Documents/proyectos/vector/ilsa/repos";

fns.store.list = [
  aux.createLink(true, "web-b2c", fns.store.repos),
  aux.createLink(false, "web-b2b", fns.store.repos),
  aux.createLink(false, "web-component-slider", fns.store.repos),
  aux.createLink(false, "web-component-header", fns.store.repos),
  aux.createLink(false, "web-component-main-footer", fns.store.repos),
  aux.createLink(false, "web-component-dinamic-footer", fns.store.repos),
  aux.createLink(false, "web-component-main-search", fns.store.repos),
];

fns.store.optionsExtra = {
  pathLibraryDist: fns.store.repos + "/ilsa-library/dist/ilsa-library",
  forAllMicrofrontends: {
    active: false,
    install: false,
    libraryLinkCreate: false,
    libraryForceUpdate: false,
  },
};
