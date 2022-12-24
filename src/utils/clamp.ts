export const clamp = (num: number, clamp: number, higher?: number) =>
  higher ? Math.min(Math.max(num, clamp), higher) : Math.min(num, clamp)
