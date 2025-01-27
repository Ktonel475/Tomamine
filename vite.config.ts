import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  base: './', // Use relative base for Capacitor
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['electron'],
    }
  },
})
