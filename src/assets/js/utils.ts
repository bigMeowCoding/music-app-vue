export function shuffle(source: any[]) {
  const arr = source.slice(0);
  for (let i = 0; i < arr.length; i++) {
    swapArrayByIndex(arr, i, getRandomNum(i));
  }
  return arr;
}
export function getRandomNum(max: number) {
  return Math.floor(Math.random() * (max + 1));
}
export function swapArrayByIndex(arr: any[], i: number, j: number) {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}
