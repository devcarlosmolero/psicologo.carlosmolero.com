// vite.config.ts
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy
} from "file:///app/node_modules/.pnpm/@remix-run+dev@2.15.3_@remix-run+react@2.15.3_react-dom@18.3.1_react@18.3.1__react@18.3_c029c93064d9e843c8e0611eb1d9c938/node_modules/@remix-run/dev/dist/index.js";
import { defineConfig } from "file:///app/node_modules/.pnpm/vite@5.4.14_@types+node@22.13.4/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///app/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.7.3_vite@5.4.14_@types+node@22.13.4_/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    port: 3e3,
    allowedHosts: ["dev.carlosmolero.com"]
  },
  assetsInclude: ["**/*.md"],
  plugins: [
    remixCloudflareDevProxy(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true
      }
    }),
    tsconfigPaths()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQge1xuICAgIHZpdGVQbHVnaW4gYXMgcmVtaXgsXG4gICAgY2xvdWRmbGFyZURldlByb3h5Vml0ZVBsdWdpbiBhcyByZW1peENsb3VkZmxhcmVEZXZQcm94eSxcbn0gZnJvbSAnQHJlbWl4LXJ1bi9kZXYnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgcG9ydDogMzAwMCxcbiAgICAgICAgYWxsb3dlZEhvc3RzOiBbJ2Rldi5jYXJsb3Ntb2xlcm8uY29tJ10sXG4gICAgfSxcbiAgICBhc3NldHNJbmNsdWRlOiBbJyoqLyoubWQnXSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHJlbWl4Q2xvdWRmbGFyZURldlByb3h5KCksXG4gICAgICAgIHJlbWl4KHtcbiAgICAgICAgICAgIGZ1dHVyZToge1xuICAgICAgICAgICAgICAgIHYzX2ZldGNoZXJQZXJzaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHYzX3JlbGF0aXZlU3BsYXRQYXRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIHYzX3Rocm93QWJvcnRSZWFzb246IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdHNjb25maWdQYXRocygpLFxuICAgIF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4TDtBQUFBLEVBQzFMLGNBQWM7QUFBQSxFQUNkLGdDQUFnQztBQUFBLE9BQzdCO0FBQ1AsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxtQkFBbUI7QUFFMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsUUFBUTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sY0FBYyxDQUFDLHNCQUFzQjtBQUFBLEVBQ3pDO0FBQUEsRUFDQSxlQUFlLENBQUMsU0FBUztBQUFBLEVBQ3pCLFNBQVM7QUFBQSxJQUNMLHdCQUF3QjtBQUFBLElBQ3hCLE1BQU07QUFBQSxNQUNGLFFBQVE7QUFBQSxRQUNKLG1CQUFtQjtBQUFBLFFBQ25CLHNCQUFzQjtBQUFBLFFBQ3RCLHFCQUFxQjtBQUFBLE1BQ3pCO0FBQUEsSUFDSixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsRUFDbEI7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
