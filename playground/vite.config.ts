import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'pathe'
import UnoCSS from 'unocss/vite'
import { templateCompilerOptions } from '@tresjs/core'
import { qrcode } from 'vite-plugin-qrcode'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      ...templateCompilerOptions,
    }),
    AutoImport({
      dts: true,
      eslintrc: {
        enabled: true, // <-- this
      },
      imports: ['vue'],
    }),
    Components({
      /* options */
    }),
    UnoCSS({
      /* options */
    }),
    qrcode(),
    mkcert(),
  ],
  resolve: {
    alias: {
      '@tresjs/xr': resolve(__dirname, '../src/'),
    },
    dedupe: ['three', '@tresjs/core'],
  },
  server: { https: true }, // TODO: Remove when upgraded to Vite 5+
})
