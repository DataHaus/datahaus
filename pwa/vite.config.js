import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import Vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import ViteFonts from "vite-plugin-fonts";
/* LFG */
export default defineConfig({
  global: {},
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
  plugins: [
    Vue(),
    Components({
      resolvers: IconsResolver({
        enabledCollections: ["mdi", "ri"],
      }),
    }),
    Icons(),
    VitePWA({
      manifest: {
        name: "DataHaus",
        short_name: "DataHaus",
        description:
          "DataHaus is a decentralized data economy built on Filecoin which provides a reliable, decentralised data foundation that efficiently handles all data types.",
        theme_color: "#061f3e",
        registerType: "autoUpdate",
        includeAssets: ["/favicon.ico"],
      },
    }),
    ViteFonts({
      google: {
        families: ["Ubuntu+Mono"],
      },
    }),
  ],
});
