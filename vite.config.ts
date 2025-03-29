import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  server: { 
    host: '0.0.0.0',
    port: Number(process.env.VITE_PORT) || 5173,
    strictPort: true, 
    allowedHosts: ['candidatesearchapp1.onrender.com']
  },
  plugins: [react()]
});
