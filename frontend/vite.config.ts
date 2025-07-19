import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import 'leaflet/dist/leaflet.css';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [require('@tailwindcss/postcss'), require('autoprefixer')],
    },
  },
});
