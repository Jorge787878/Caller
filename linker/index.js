const linkOpts = require("./linker-config");
const linker = require("./linker");

const optionsToUse = linkOpts.filter((option) => option.active);

optionsToUse.forEach((option) => linker(option));
