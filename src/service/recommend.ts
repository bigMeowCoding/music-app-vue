import { get } from "./base";

export function getRecommend(): Promise<{
  sliders: any[];
}> {
  return get("/api/getRecommend");
}

export function getAlbum(album: { id: string }) {
  return get("/api/getAlbum", {
    id: album.id,
  });
}
