export function shuffle(arr) {
  const ret = arr.slice(0);
  for (let i = 0; i < ret.length; i++) {
    const j = randomNum(i);
    swap(ret, i, j);
  }
  return ret;
}
export function randomNum(max) {
  return Math.floor(Math.random() * (max + 1));
}
export function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export function formatTime(times) {
  times = times | 0;
  const min = (((times / 60) | 0) + "").padStart(2, "0");
  const sec = ((times % 60) + "").padStart(2, "0");
  return `${min}:${sec}`;
}
