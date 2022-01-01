import { get } from "./base";

export function getHotKeys() {
  return get("/api/getHotKeys");
}

export function search(query: any, page: any, showSinger: any) {
  return get("/api/search", {
    query,
    page,
    showSinger,
  });
}
