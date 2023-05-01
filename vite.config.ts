/// <reference types="vitest" />
/// <reference types="vite/client" />

import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// import config from ''

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    port: 3000,
  },
});
