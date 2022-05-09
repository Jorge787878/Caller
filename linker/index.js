const linkOpts = require("./linker-config");
const linker = require("./linker");


const params = {};

let myArgs = process.argv.slice(2);
myArgs.forEach((slug) => {
  const partials = slug.split("=");
  params[partials[0]] = partials[1];
});

console.log("myArgs: ", params);

const optionsToUse = linkOpts.options.forAllMicrofrontends.active
  ? linkOpts.list
  : linkOpts.list.filter((option) => option.active);

optionsToUse.forEach((option) => linker(option, linkOpts.options));
