export type PayloadAction<P = unknown, T extends string = string> = {
  payload: P;
  type: T;
};
