import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// github pages config
export default defineConfig({
  plugins: [react()],
  base: '',
})
