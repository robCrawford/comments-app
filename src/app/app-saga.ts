export function* init(): Generator<Promise<void>, void> {
  yield new Promise((res) => {
    setTimeout(() => {
      res();
    }, 1000);
  });
}
