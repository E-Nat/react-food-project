import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : (process.env.BASE_PATH || (process.env.GITHUB_PAGES ? '/react-food-project/' : '/')),
});