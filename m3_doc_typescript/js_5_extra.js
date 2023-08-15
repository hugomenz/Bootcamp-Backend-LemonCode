// aqui intente hacerlo sin usar bucles

const elements = [0, 1, false, 2, "", 3];

const compact = (arg) => {
  if (Array.isArray(arg)) {
    return arg.filter(Boolean);
  } else if (typeof arg === "object" && arg !== null) {
    return Object.entries(arg).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});
  } else {
    return arg;
  }
};

console.log(compact(123)); // 123
console.log(compact(null)); // null
console.log(compact([0, 1, false, 2, "", 3])); // [1, 2, 3]
console.log(compact({})); // {}
console.log(compact({ price: 0, name: "cloud", altitude: NaN, taste: undefined, isAlive: false })); // {name: "cloud"}
