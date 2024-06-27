// vite.config.ts
import { defineConfig } from "file:///Users/alvarosabu/Projects/tres/xr/node_modules/.pnpm/vite@4.5.0_@types+node@20.9.0/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/alvarosabu/Projects/tres/xr/node_modules/.pnpm/@vitejs+plugin-vue@4.4.0_vite@4.5.0_vue@3.3.8/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///Users/alvarosabu/Projects/tres/xr/node_modules/.pnpm/unplugin-auto-import@0.16.7/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///Users/alvarosabu/Projects/tres/xr/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.8/node_modules/unplugin-vue-components/dist/vite.mjs";
import { resolve } from "file:///Users/alvarosabu/Projects/tres/xr/node_modules/.pnpm/pathe@1.1.1/node_modules/pathe/dist/index.mjs";
import UnoCSS from "file:///Users/alvarosabu/Projects/tres/xr/node_modules/.pnpm/unocss@0.57.3_postcss@8.4.31_vite@4.5.0/node_modules/unocss/dist/vite.mjs";
import { templateCompilerOptions } from "file:///Users/alvarosabu/Projects/tres/xr/node_modules/.pnpm/@tresjs+core@3.5.0_three@0.158.0_vue@3.3.8/node_modules/@tresjs/core/dist/tres.js";
import { qrcode } from "file:///Users/alvarosabu/Projects/tres/xr/node_modules/.pnpm/vite-plugin-qrcode@0.2.2_vite@4.5.0/node_modules/vite-plugin-qrcode/dist/index.js";
var __vite_injected_original_dirname = "/Users/alvarosabu/Projects/tres/xr/playground";
var vite_config_default = defineConfig({
  plugins: [
    vue({
      ...templateCompilerOptions
    }),
    AutoImport({
      dts: true,
      eslintrc: {
        enabled: true
        // <-- this
      },
      imports: ["vue"]
    }),
    Components({
      /* options */
    }),
    UnoCSS({
      /* options */
    }),
    qrcode()
  ],
  resolve: {
    alias: {
      "@tresjs/xr": resolve(__vite_injected_original_dirname, "../src/")
    },
    dedupe: ["three", "@tresjs/core"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWx2YXJvc2FidS9Qcm9qZWN0cy90cmVzL3hyL3BsYXlncm91bmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hbHZhcm9zYWJ1L1Byb2plY3RzL3RyZXMveHIvcGxheWdyb3VuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWx2YXJvc2FidS9Qcm9qZWN0cy90cmVzL3hyL3BsYXlncm91bmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoZSdcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgeyB0ZW1wbGF0ZUNvbXBpbGVyT3B0aW9ucyB9IGZyb20gJ0B0cmVzanMvY29yZSdcbmltcG9ydCB7IHFyY29kZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXFyY29kZSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoe1xuICAgICAgLi4udGVtcGxhdGVDb21waWxlck9wdGlvbnMsXG4gICAgfSksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBkdHM6IHRydWUsXG4gICAgICBlc2xpbnRyYzoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLCAvLyA8LS0gdGhpc1xuICAgICAgfSxcbiAgICAgIGltcG9ydHM6IFsndnVlJ10sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICAvKiBvcHRpb25zICovXG4gICAgfSksXG4gICAgVW5vQ1NTKHtcbiAgICAgIC8qIG9wdGlvbnMgKi9cbiAgICB9KSxcbiAgICBxcmNvZGUoKSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQHRyZXNqcy94cic6IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjLycpLFxuICAgIH0sXG4gICAgZGVkdXBlOiBbJ3RocmVlJywgJ0B0cmVzanMvY29yZSddLFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVQsU0FBUyxvQkFBb0I7QUFDdFYsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFlBQVk7QUFDbkIsU0FBUywrQkFBK0I7QUFDeEMsU0FBUyxjQUFjO0FBUHZCLElBQU0sbUNBQW1DO0FBVXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLEdBQUc7QUFBQSxJQUNMLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULEtBQUs7QUFBQSxNQUNMLFVBQVU7QUFBQSxRQUNSLFNBQVM7QUFBQTtBQUFBLE1BQ1g7QUFBQSxNQUNBLFNBQVMsQ0FBQyxLQUFLO0FBQUEsSUFDakIsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBO0FBQUEsSUFFWCxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUE7QUFBQSxJQUVQLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxjQUFjLFFBQVEsa0NBQVcsU0FBUztBQUFBLElBQzVDO0FBQUEsSUFDQSxRQUFRLENBQUMsU0FBUyxjQUFjO0FBQUEsRUFDbEM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
