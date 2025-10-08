import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "./"), // 현재 폴더를 루트로 고정
  publicDir: path.resolve(__dirname, "./public"),
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
