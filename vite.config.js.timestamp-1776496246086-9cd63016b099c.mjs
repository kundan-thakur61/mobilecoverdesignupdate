// vite.config.js
import { defineConfig } from "file:///C:/Users/kundan/Desktop/copadMob/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/kundan/Desktop/copadMob/frontend/node_modules/@vitejs/plugin-react/dist/index.js";
import { visualizer } from "file:///C:/Users/kundan/Desktop/copadMob/frontend/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  const plugins = [react()];
  if (mode === "production" && process.env.ANALYZE) {
    plugins.push(
      visualizer({
        filename: "./dist/bundle-analysis.html",
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    );
  }
  return {
    plugins,
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom", "react-redux", "@reduxjs/toolkit"]
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:4000",
          changeOrigin: true,
          secure: false
        }
      }
    },
    // CSS optimization — Tailwind uses PostCSS, so keep default transformer
    // Lightning CSS is used only for minification (cssMinify below)
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info", "console.debug", "console.trace"],
          passes: 3,
          // extra pass for deeper optimization
          ecma: 2020,
          dead_code: true,
          collapse_vars: true,
          reduce_vars: true,
          hoist_funs: true,
          toplevel: false,
          // Aggressive unused code removal
          unused: true,
          booleans_as_integers: true
        },
        mangle: {
          safari10: true,
          toplevel: false
        },
        format: {
          comments: false,
          ecma: 2020,
          ascii_only: true
        }
      },
      chunkSizeWarningLimit: 300,
      // tighter warning threshold
      cssCodeSplit: true,
      sourcemap: false,
      cssMinify: true,
      // Use esbuild for CSS minification (compatible with Tailwind)
      target: "es2020",
      modulePreload: {
        polyfill: false
      },
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("react-dom") || id.includes("/react/") && !id.includes("react-")) {
              return "vendor-react";
            }
            if (id.includes("react-router")) {
              return "vendor-router";
            }
            if (id.includes("react-redux") || id.includes("@reduxjs/toolkit") || id.includes("redux")) {
              return "vendor-redux";
            }
            if (id.includes("axios")) {
              return "vendor-http";
            }
            if (id.includes("socket.io-client")) {
              return "vendor-socket";
            }
            if (id.includes("@sentry/")) {
              return "vendor-sentry";
            }
            if (id.includes("react-toastify")) {
              return "vendor-toast";
            }
            if (id.includes("react-icons")) {
              return "vendor-icons";
            }
            if (id.includes("react-helmet")) {
              return "vendor-utils";
            }
          },
          assetFileNames: (assetInfo) => {
            const ext = assetInfo.name.split(".").pop();
            if (/png|jpe?g|svg|gif|ico|webp|avif/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxrdW5kYW5cXFxcRGVza3RvcFxcXFxjb3BhZE1vYlxcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxca3VuZGFuXFxcXERlc2t0b3BcXFxcY29wYWRNb2JcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2t1bmRhbi9EZXNrdG9wL2NvcGFkTW9iL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gICAgY29uc3QgcGx1Z2lucyA9IFtyZWFjdCgpXTtcclxuXHJcbiAgICBpZiAobW9kZSA9PT0gJ3Byb2R1Y3Rpb24nICYmIHByb2Nlc3MuZW52LkFOQUxZWkUpIHtcclxuICAgICAgICBwbHVnaW5zLnB1c2goXHJcbiAgICAgICAgICAgIHZpc3VhbGl6ZXIoe1xyXG4gICAgICAgICAgICAgICAgZmlsZW5hbWU6ICcuL2Rpc3QvYnVuZGxlLWFuYWx5c2lzLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGd6aXBTaXplOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGx1Z2lucyxcclxuXHJcbiAgICAgICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgICAgICAgIGluY2x1ZGU6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nLCAncmVhY3QtcmVkdXgnLCAnQHJlZHV4anMvdG9vbGtpdCddLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlcnZlcjoge1xyXG4gICAgICAgICAgICBwcm94eToge1xyXG4gICAgICAgICAgICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo0MDAwJyxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQ1NTIG9wdGltaXphdGlvbiBcdTIwMTQgVGFpbHdpbmQgdXNlcyBQb3N0Q1NTLCBzbyBrZWVwIGRlZmF1bHQgdHJhbnNmb3JtZXJcclxuICAgICAgICAvLyBMaWdodG5pbmcgQ1NTIGlzIHVzZWQgb25seSBmb3IgbWluaWZpY2F0aW9uIChjc3NNaW5pZnkgYmVsb3cpXHJcblxyXG4gICAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICAgICAgICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcHVyZV9mdW5jczogWydjb25zb2xlLmxvZycsICdjb25zb2xlLmluZm8nLCAnY29uc29sZS5kZWJ1ZycsICdjb25zb2xlLnRyYWNlJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc2VzOiAzLCAvLyBleHRyYSBwYXNzIGZvciBkZWVwZXIgb3B0aW1pemF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgZWNtYTogMjAyMCxcclxuICAgICAgICAgICAgICAgICAgICBkZWFkX2NvZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGFwc2VfdmFyczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICByZWR1Y2VfdmFyczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBob2lzdF9mdW5zOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcGxldmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZ2dyZXNzaXZlIHVudXNlZCBjb2RlIHJlbW92YWxcclxuICAgICAgICAgICAgICAgICAgICB1bnVzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbGVhbnNfYXNfaW50ZWdlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbWFuZ2xlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2FmYXJpMTA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wbGV2ZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZvcm1hdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBlY21hOiAyMDIwLFxyXG4gICAgICAgICAgICAgICAgICAgIGFzY2lpX29ubHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAzMDAsIC8vIHRpZ2h0ZXIgd2FybmluZyB0aHJlc2hvbGRcclxuICAgICAgICAgICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxyXG4gICAgICAgICAgICBzb3VyY2VtYXA6IGZhbHNlLFxyXG4gICAgICAgICAgICBjc3NNaW5pZnk6IHRydWUsIC8vIFVzZSBlc2J1aWxkIGZvciBDU1MgbWluaWZpY2F0aW9uIChjb21wYXRpYmxlIHdpdGggVGFpbHdpbmQpXHJcbiAgICAgICAgICAgIHRhcmdldDogJ2VzMjAyMCcsXHJcbiAgICAgICAgICAgIG1vZHVsZVByZWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgIHBvbHlmaWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYXNzZXRzSW5saW5lTGltaXQ6IDQwOTYsXHJcblxyXG4gICAgICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29yZSBSZWFjdCBcdTIwMTQgYWx3YXlzIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3JlYWN0LWRvbScpIHx8IChpZC5pbmNsdWRlcygnL3JlYWN0LycpICYmICFpZC5pbmNsdWRlcygncmVhY3QtJykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci1yZWFjdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUm91dGVyIFx1MjAxNCBuZWVkZWQgZm9yIG5hdmlnYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdyZWFjdC1yb3V0ZXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3Itcm91dGVyJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWR1eCBcdTIwMTQgc3RhdGUgbWFuYWdlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3JlYWN0LXJlZHV4JykgfHwgaWQuaW5jbHVkZXMoJ0ByZWR1eGpzL3Rvb2xraXQnKSB8fCBpZC5pbmNsdWRlcygncmVkdXgnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItcmVkdXgnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhUVFAgY2xpZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnYXhpb3MnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItaHR0cCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSGVhdnkgbGlicyBcdTIwMTQgc2VwYXJhdGUgY2h1bmtzIChsYXp5IGxvYWRlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdzb2NrZXQuaW8tY2xpZW50JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAndmVuZG9yLXNvY2tldCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdAc2VudHJ5LycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci1zZW50cnknO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvYXN0IFx1MjAxNCBzZXBhcmF0ZSBjaHVuayAobGF6eSBsb2FkZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVhY3QtdG9hc3RpZnknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItdG9hc3QnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEljb25zIFx1MjAxNCB0cmVlLXNoYWtlLCBzZXBhcmF0ZSBjaHVua1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3JlYWN0LWljb25zJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAndmVuZG9yLWljb25zJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBIZWxtZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdyZWFjdC1oZWxtZXQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItdXRpbHMnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXh0ID0gYXNzZXRJbmZvLm5hbWUuc3BsaXQoJy4nKS5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9wbmd8anBlP2d8c3ZnfGdpZnxpY298d2VicHxhdmlmL2kudGVzdChleHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYGFzc2V0cy9pbWFnZXMvW25hbWVdLVtoYXNoXVtleHRuYW1lXWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC93b2ZmMj98ZW90fHR0ZnxvdGYvaS50ZXN0KGV4dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgYXNzZXRzL2ZvbnRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV1gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVQsU0FBUyxvQkFBb0I7QUFDdFYsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsa0JBQWtCO0FBRTNCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3RDLFFBQU0sVUFBVSxDQUFDLE1BQU0sQ0FBQztBQUV4QixNQUFJLFNBQVMsZ0JBQWdCLFFBQVEsSUFBSSxTQUFTO0FBQzlDLFlBQVE7QUFBQSxNQUNKLFdBQVc7QUFBQSxRQUNQLFVBQVU7QUFBQSxRQUNWLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLFlBQVk7QUFBQSxNQUNoQixDQUFDO0FBQUEsSUFDTDtBQUFBLEVBQ0o7QUFFQSxTQUFPO0FBQUEsSUFDSDtBQUFBLElBRUEsY0FBYztBQUFBLE1BQ1YsU0FBUyxDQUFDLFNBQVMsYUFBYSxvQkFBb0IsZUFBZSxrQkFBa0I7QUFBQSxJQUN6RjtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ0osT0FBTztBQUFBLFFBQ0gsUUFBUTtBQUFBLFVBQ0osUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsUUFBUTtBQUFBLFFBQ1o7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBO0FBQUE7QUFBQSxJQUtBLE9BQU87QUFBQSxNQUNILFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNYLFVBQVU7QUFBQSxVQUNOLGNBQWM7QUFBQSxVQUNkLGVBQWU7QUFBQSxVQUNmLFlBQVksQ0FBQyxlQUFlLGdCQUFnQixpQkFBaUIsZUFBZTtBQUFBLFVBQzVFLFFBQVE7QUFBQTtBQUFBLFVBQ1IsTUFBTTtBQUFBLFVBQ04sV0FBVztBQUFBLFVBQ1gsZUFBZTtBQUFBLFVBQ2YsYUFBYTtBQUFBLFVBQ2IsWUFBWTtBQUFBLFVBQ1osVUFBVTtBQUFBO0FBQUEsVUFFVixRQUFRO0FBQUEsVUFDUixzQkFBc0I7QUFBQSxRQUMxQjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ0osVUFBVTtBQUFBLFVBQ1YsVUFBVTtBQUFBLFFBQ2Q7QUFBQSxRQUNBLFFBQVE7QUFBQSxVQUNKLFVBQVU7QUFBQSxVQUNWLE1BQU07QUFBQSxVQUNOLFlBQVk7QUFBQSxRQUNoQjtBQUFBLE1BQ0o7QUFBQSxNQUVBLHVCQUF1QjtBQUFBO0FBQUEsTUFDdkIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDWCxVQUFVO0FBQUEsTUFDZDtBQUFBLE1BQ0EsbUJBQW1CO0FBQUEsTUFFbkIsZUFBZTtBQUFBLFFBQ1gsUUFBUTtBQUFBLFVBQ0osYUFBYSxJQUFJO0FBRWIsZ0JBQUksR0FBRyxTQUFTLFdBQVcsS0FBTSxHQUFHLFNBQVMsU0FBUyxLQUFLLENBQUMsR0FBRyxTQUFTLFFBQVEsR0FBSTtBQUNoRixxQkFBTztBQUFBLFlBQ1g7QUFFQSxnQkFBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQzdCLHFCQUFPO0FBQUEsWUFDWDtBQUVBLGdCQUFJLEdBQUcsU0FBUyxhQUFhLEtBQUssR0FBRyxTQUFTLGtCQUFrQixLQUFLLEdBQUcsU0FBUyxPQUFPLEdBQUc7QUFDdkYscUJBQU87QUFBQSxZQUNYO0FBRUEsZ0JBQUksR0FBRyxTQUFTLE9BQU8sR0FBRztBQUN0QixxQkFBTztBQUFBLFlBQ1g7QUFFQSxnQkFBSSxHQUFHLFNBQVMsa0JBQWtCLEdBQUc7QUFDakMscUJBQU87QUFBQSxZQUNYO0FBQ0EsZ0JBQUksR0FBRyxTQUFTLFVBQVUsR0FBRztBQUN6QixxQkFBTztBQUFBLFlBQ1g7QUFFQSxnQkFBSSxHQUFHLFNBQVMsZ0JBQWdCLEdBQUc7QUFDL0IscUJBQU87QUFBQSxZQUNYO0FBRUEsZ0JBQUksR0FBRyxTQUFTLGFBQWEsR0FBRztBQUM1QixxQkFBTztBQUFBLFlBQ1g7QUFFQSxnQkFBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQzdCLHFCQUFPO0FBQUEsWUFDWDtBQUFBLFVBQ0o7QUFBQSxVQUVBLGdCQUFnQixDQUFDLGNBQWM7QUFDM0Isa0JBQU0sTUFBTSxVQUFVLEtBQUssTUFBTSxHQUFHLEVBQUUsSUFBSTtBQUMxQyxnQkFBSSxtQ0FBbUMsS0FBSyxHQUFHLEdBQUc7QUFDOUMscUJBQU87QUFBQSxZQUNYO0FBQ0EsZ0JBQUksc0JBQXNCLEtBQUssR0FBRyxHQUFHO0FBQ2pDLHFCQUFPO0FBQUEsWUFDWDtBQUNBLG1CQUFPO0FBQUEsVUFDWDtBQUFBLFVBRUEsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsUUFDcEI7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
