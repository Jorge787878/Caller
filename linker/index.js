const linkOpts = require("./linker-config");
const linker = require("./linker");

const optionsToUse = linkOpts.options.forAllMicrofrontends.active
  ? linkOpts.list
  : linkOpts.list.filter((option) => option.active);

optionsToUse.forEach((option) => linker(option, linkOpts.options));
