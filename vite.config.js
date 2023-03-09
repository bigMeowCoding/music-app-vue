import { defineConfig } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssEnv from "postcss-preset-env";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
export default defineConfig(() => {
  return {
    resolve: {
      extensions: [".vue", ".js", ".ts",'.mjs'],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "${path.resolve(
            __dirname,
            "src/styles/variable.scss"
          )}";
          @import "${path.resolve(__dirname, "src/styles/mixin.scss")}";
          
          `,
        },
      },
    },
  };
});
