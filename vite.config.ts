import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Use relative base for Capacitor
  build: {
    outDir: 'dist',
    rollupOptions:{
      external: ['electron'],
    }
  },
})
