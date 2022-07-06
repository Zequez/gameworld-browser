import { resolve } from "path";
import { defineConfig } from "windicss/helpers";

export default defineConfig({
  theme: {
    extend: {
      aspectRatio: { golden: "162/100" },
    },
  },
  darkMode: "class",
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,
  extract: {
    include: [resolve(__dirname, "src/**/*.{vue,html}")],
  },
  plugins: [require("windicss/plugin/aspect-ratio")],
});
