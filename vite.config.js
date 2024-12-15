import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Nếu bạn sử dụng alias cho src
    },
  },
  server: {
    proxy: {
      // Định nghĩa proxy cho API
      '/api': {
        target: 'https://serverleaderbroad.fly.dev', // URL của server
        changeOrigin: true, // Thay đổi origin để phù hợp với server
        rewrite: (path) => path.replace(/^\/api/, ''), // Xóa prefix '/api'
      },
    },
  },
});
