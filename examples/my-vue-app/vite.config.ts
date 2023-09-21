import { defineConfig } from 'vite'
import vitePluginStyleVwLoader from 'vite-plugin-style-vw-loader';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vitePluginStyleVwLoader(), vue()],
})
 