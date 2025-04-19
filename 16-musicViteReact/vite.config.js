import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import optimizer from "vite-plugin-optimizer";
import { devPlugin, getReplacer } from './plugins/devPlugin';
// https://vite.dev/config/
export default defineConfig({
  plugins: [optimizer(getReplacer()),devPlugin(), react()],
})
