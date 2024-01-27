import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/react/', // Adjust this path to match your subdirectory
  plugins: [react()],
})

