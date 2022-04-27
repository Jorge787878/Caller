const repos = "C:/Users/jjcampoy/Documents/proyectos/vector/ilsa/repos";

const options = [
  {
    name: "B2C",
    active: false,
    pathToWork: repos + "/web-b2c",
    folderContainerLibraryDistToLink: "/ilsa-apps/ilsa-library",
    linkName: "@ilsa/library",
    libraryName: "@ilsa/library",
  },
  {
    name: "B2B",
    active: false,
    pathToWork: repos + "/web-b2b",
    folderContainerLibraryDistToLink: "/ilsa-apps/ilsa-library",
    linkName: "@ilsa/library",
    libraryName: "@ilsa/library",
  },
  {
    name: "web-component-main-footer",
    active: false,
    pathToWork: repos + "/web-component-main-footer",
    folderContainerLibraryDistToLink: "/ilsa-apps/ilsa-library",
    linkName: "@ilsa/library",
    libraryName: "@ilsa/library",
  },
  {
    name: "web-component-dinamic-footer",
    active: true,
    pathToWork: repos + "/web-component-dinamic-footer",
    folderContainerLibraryDistToLink: "/ilsa-apps/ilsa-library",
    linkName: "@ilsa/library",
    libraryName: "@ilsa/library",
  },
];

module.exports = options;
