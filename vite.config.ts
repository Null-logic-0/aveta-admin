import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/": {
        target: "http://ec2-13-218-165-221.compute-1.amazonaws.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
