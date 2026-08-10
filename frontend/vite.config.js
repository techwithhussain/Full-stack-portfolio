import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // inline assets < 4KB as base64
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            if (id.includes('react-router-dom')) {
              return 'vendor-router'
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion'
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap'
            }
            if (id.includes('swiper')) {
              return 'vendor-swiper'
            }
            if (id.includes('axios')) {
              return 'vendor-axios'
            }
            if (id.includes('react-helmet')) {
              return 'vendor-helmet'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
