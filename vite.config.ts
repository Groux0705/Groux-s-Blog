import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Groux-s-Blog/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      clientPort: 5173
    }
  }
}))
