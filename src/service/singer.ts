import { get } from "./base";

export function getSingerList(): Promise<{ singers: any[] }> {
  return get("/api/getSingerList");
}

export function getSingerDetail(singer: { mid: string }): Promise<any> {
  return get("/api/getSingerDetail", {
    mid: singer?.mid,
  });
}
