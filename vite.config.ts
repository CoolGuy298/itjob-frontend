import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', 
    port: 5173
  },
  css: {
    devSourcemap: false
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})
