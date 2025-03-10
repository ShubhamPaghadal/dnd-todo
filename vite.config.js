import { defineConfig } from "vite";
import reactswc from "@vitejs/plugin-react-swc";

export default defineConfig(() => {
  return {
    build: {
      outDir: "dist",
    },

    plugins: [reactswc()],
    esbuild: {
      loader: "jsx",
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },

    server: {
      port: 3000,
      open: true,
    },
    optimizeDeps: {
      esbuildoptions: {
        loader: {
          ".js": "jsx",
        },
      },
    },
  };
});
