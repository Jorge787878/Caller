const repos = "C:/Users/jjcampoy/Documents/proyectos/vector/ilsa/repos";
const options = {
  pathLibraryDist: repos + "/ilsa-library/dist/ilsa-library",
  forAllMicrofrontends: {
    active: false,
    nodeModulesInstall: false,
    libraryLinkCreate: false,
    libraryForceUpdate: false,
  },
};

const list = [
  {
    name: "B2C",
    active: false,
    pathToWork: repos + "/web-b2c",
    folderContainerLibraryDistToLink: "/ilsa-apps/ilsa-library",
    linkName: "@ilsa/library",
    libraryName: "@ilsa/library",
    nodeModulesInstall: true,
    libraryLinkCreate: true,
    libraryForceUpdate: false,
  },
  {
    name: "B2B",
    active: false,
    pathToWork: repos + "/web-b2b",
    folderContainerLibraryDistToLink: "/ilsa-apps/ilsa-library",
    linkName: "@ilsa/library",
    libraryName: "@ilsa/library",
    nodeModulesInstall: true,
    libraryLinkCreate: true,
    libraryForceUpdate: false,
  },
  {
    name: "web-component-main-footer",
    active: false,
    pathToWork: repos + "/web-component-main-footer",
    folderContainerLibraryDistToLink: "/ilsa-apps/ilsa-library",
    linkName: "@ilsa/library",
    libraryName: "@ilsa/library",
    nodeModulesInstall: true,
    libraryLinkCreate: true,
    libraryForceUpdate: false,
  },
  {
    name: "web-component-dinamic-footer",
    active: false,
    pathToWork: repos + "/web-component-dinamic-footer",
    folderContainerLibraryDistToLink: "/ilsa-apps/ilsa-library",
    linkName: "@ilsa/library",
    libraryName: "@ilsa/library",
    nodeModulesInstall: true,
    libraryLinkCreate: true,
    libraryForceUpdate: false,
  },
  {
    name: "web-component-slider",
    active: false,
    pathToWork: repos + "/web-component-slider",
    folderContainerLibraryDistToLink: "/ilsa-apps/ilsa-library",
    linkName: "@ilsa/library",
    libraryName: "@ilsa/library",
    nodeModulesInstall: true,
    libraryLinkCreate: true,
    libraryForceUpdate: false,
  },
  {
    name: "web-component-header",
    active: true,
    pathToWork: repos + "/web-component-header",
    folderContainerLibraryDistToLink: "/ilsa-apps/ilsa-library",
    linkName: "@ilsa/library",
    libraryName: "@ilsa/library",
    nodeModulesInstall: true,
    libraryLinkCreate: true,
    libraryForceUpdate: false,
  },
];

module.exports = {
  options,
  list,
};
