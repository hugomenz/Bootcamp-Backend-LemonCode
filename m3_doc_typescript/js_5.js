const elements = [0, 1, false, 2, "", 3];

const compact = (arg) => {
  if (Array.isArray(arg)) {
    let result = [];
    for (let i = 0; i < arg.length; i++) {
      if (arg[i]) {
        result.push(arg[i]);
      }
    }
    return result;
  } else if (typeof arg === "object" && arg !== null) {
    let result = {};
    for (let key in arg) {
      if (arg[key]) {
        result[key] = arg[key];
      }
    }
    return result;
  } else {
    return arg;
  }
};

console.log(compact(123)); // 123
console.log(compact(null)); // null
console.log(compact([0, 1, false, 2, "", 3])); // [1, 2, 3]
console.log(compact({})); // {}
console.log(compact({ price: 0, name: "cloud", altitude: NaN, taste: undefined, isAlive: false })); // {name: "cloud"}
