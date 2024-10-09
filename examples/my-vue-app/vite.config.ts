import { defineConfig } from 'vite'
import vitePluginStyleVwLoader from '../../dist/index.mjs';
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vitePluginStyleVwLoader(), vue(), UnoCSS()],
})
 