export function* init() {
  yield new Promise((res) => {
    setTimeout(() => {
      res();
    }, 1000);
  });
}
