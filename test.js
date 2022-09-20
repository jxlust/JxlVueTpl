function promiseResolveThen(fn) {
  Promise.resolve().then(fn);
}

promiseResolveThen(() => {
  console.log(1111);
});

Promise.resolve().then(() => {
  console.log(3333);
});
console.log(222);
