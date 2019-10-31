export const fetchCounter = (): Promise<number> => new Promise(
  res => setTimeout(
    () => res(Math.floor(Math.random() * 10) + 100),
    1000
  )
);
