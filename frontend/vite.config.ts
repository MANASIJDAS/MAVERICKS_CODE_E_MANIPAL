import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({ targets: [{ src: '../DashboardBG.jpg', dest: '.' }] }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png', '../DashboardBG.jpg'],
      manifest: {
        name: 'CrewSignal',
        short_name: 'CrewSignal',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f172a',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: '/DashboardBG.jpg',
            handler: 'CacheFirst',
            options: { cacheName: 'dashboard-bg', expiration: { maxEntries: 1 } }
          },
          {
            urlPattern: /.*\.(?:js|css|html|png|svg|jpg)/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'static-assets', expiration: { maxEntries: 100 } }
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: { input: '/index.html' }
  }
})
