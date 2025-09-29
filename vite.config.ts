import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // optional: allows clean imports like "@/components/Button"
    },
  },
  optimizeDeps: {
    include: ['lucide-react'], // ✅ make sure it's pre-bundled
  },
  build: {
    outDir: 'final', // default, but good to keep explicit
    sourcemap: true, // helpful for debugging production
  },
  server: {
    port: 5173, // or your preferred dev port
    open: true, // auto-open browser on dev start
  },
});
