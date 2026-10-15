import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({ targets: [{ src: '../DashboardBG.jpg', dest: '.' }] })
  ],
  build: {
    rollupOptions: {
      input: '/index.html'
    }
  }
})
