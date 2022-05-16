const linkOpts = require("./linker-config");
const linker = require("./linker");
const fns = require("./functions/index");

fns.store.nodeParams = fns.aux.getCommandParams();

fns.store.microfrontends = fns.store.optionsExtra.forAllMicrofrontends.active
  ? fns.store.list
  : fns.store.list.filter((option) => option.active);

fns.store.microfrontends.forEach((option) => linker(option, fns.store.optionsExtra));
