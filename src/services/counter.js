export const fetchCounter = () => new Promise(res => setTimeout(() => res(Math.floor(Math.random() * 10) + 100), 1500));
