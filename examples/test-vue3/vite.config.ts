import { fileURLToPath, URL } from 'node:url'
import vitePluginStyleVwLoader from 'vite-plugin-style-vw-loader';
// console.log(template);

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  plugins: [vitePluginStyleVwLoader(), vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
