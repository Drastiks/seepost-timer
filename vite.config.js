import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    open: false,
    headers: {
      'Cache-Control': 'no-store'
    },
    hmr: {
      overlay: false
    }
  }
});
