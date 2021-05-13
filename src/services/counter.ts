export const testWait = (ms: number): Promise<void> => new Promise(res => {
  setTimeout(res, ms);
});

export const fetchCounter = (syncId: number): Promise<number> => new Promise(
  res => {
    console.log('fetchCounter request #' + syncId + '...');
    const int = Math.floor(Math.random() * 10);
    setTimeout(
      () => {
        console.log('fetchCounter response #' + syncId + ' ✓');
        res(int + 100);
      },
      int * 400
    );}
);
