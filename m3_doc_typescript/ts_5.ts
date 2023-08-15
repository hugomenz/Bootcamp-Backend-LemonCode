const swap = <T, U>(arg1: T, arg2: U): [U, T] => {
  return [arg2, arg1];
};

let age: number;
let occupation: string;

[occupation, age] = swap<number, string>(39, "Placement officer");

console.log("Occupation: ", occupation);
console.log("Age: ", age);
