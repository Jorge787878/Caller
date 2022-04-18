const obj = {
  data: {
    results: [{ num: 1 }, { num: 2 }, { num: 3 }],
  },
};

function getPath(obj, path) {
  segments = path.split(".");
  currentData = obj;

  segments.forEach((segment) => {
    currentData = currentData[segment];
  });

  return currentData;
}

console.log(getPath(obj, "data.results"));
