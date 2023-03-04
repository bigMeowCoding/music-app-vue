import { defineConfig } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssEnv from "postcss-preset-env";
export default defineConfig(() => {
  return {
    resolve: {
      extensions:['.vue','.js','.ts'],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "${path.resolve(
            __dirname,
            "src/styles/variable.scss"
          )}";
          @import "${path.resolve(
            __dirname,
            "src/styles/mixin.scss"
          )}";
          
          `,
        },
      },
    },
  };
});
