import axios from "axios";
import { SERVER_PORT } from "@/common/config/server.config.ts";

const ERR_OK = 0;

function getDevUrl() {
  console.log(import.meta.env.SSR, "importmmmm");
  return `http://127.0.0.1:${SERVER_PORT}/api3`;
}

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://www.bigmeow.club/music-app/"
    : getDevUrl();

axios.defaults.baseURL = baseURL;

export function get(url, params) {
  return axios
    .get(url, {
      params,
    })
    .then((res) => {
      const serverData = res.data;
      if (serverData.code === ERR_OK) {
        return serverData.result;
      }
    })
    .catch((e) => {
      console.log("errrrr", e);
    });
}
