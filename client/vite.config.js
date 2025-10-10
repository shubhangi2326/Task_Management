// client/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api' से शुरू होने वाले किसी भी रिक्वेस्ट को प्रॉक्सी करें
      '/api': {
        target: 'http://localhost:5000', // आपका बैकएंड सर्वर
        changeOrigin: true,
      },
    },
  },
})