<<<<<<< HEAD
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, "./"), // 현재 폴더를 루트로 고정
  publicDir: path.resolve(__dirname, "./public"),
  plugins: [react()],
  server: {
    open: true,
  },
});
=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
>>>>>>> bc11b5198b389a485c24d637c5ad1e0568cc7df3
