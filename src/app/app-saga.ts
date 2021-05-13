export function* init(): Generator<Promise<void>, void> {
  yield new Promise((res) => {
    console.log('init request...');
    setTimeout(() => {
      console.log('init response ✓');
      res();
    }, 1000);
  });
}
