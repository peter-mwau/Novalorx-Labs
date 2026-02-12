import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  base: 'https://novalorxlabs.netlify.app/',
  plugins: [react(), tailwindcss(),
  VitePWA({
    registerType: 'autoUpdate', workbox: {
      clientsClaim: true,
      skipWaiting: true
    },
    manifest: {
      name: 'Novalorx Labs',
      short_name: 'Novalorx Labs',
      description: '',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/Novalorx_mini_logo.svg',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/Novalorx_mini_logo.svg',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    }
  },)
  ],
})
