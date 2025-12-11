import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/API': {
        target: 'http://203.189.137.34:1265/',
        //target: 'http://192.168.10.10:9592/', 
        
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/API/, '/ksfh_backend/API/')
      }
    }
  },
  
  
})

