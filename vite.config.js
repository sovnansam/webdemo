import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/API': {
        target: 'http://203.189.137.34:1265/ksfh_backend',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/API/, '')
      }
    }
  }
})

