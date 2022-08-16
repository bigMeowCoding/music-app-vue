import storage from "good-storage";

function insertItemToArray(item, arr, compare, maxLength) {
  const index = arr.findIndex(compare);
  if (index !== -1) {
    return;
  }
  arr.unshift(item);
  if (maxLength && arr.length > maxLength) {
    arr.pop();
  }
  return arr;
}
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export function save(item, key, compare, maxLength) {
  const arr = storage.get(key, []);
  insertItemToArray(item, arr, compare, maxLength);
  storage.set(key, arr);
  return arr;
}

export function remove(key, compare) {
  const arr = storage.get(key, []);
  deleteFromArray(arr, compare);
  storage.set(key, arr);
  return arr;
}

export function load(key) {
  return storage.get(key, []);
}
