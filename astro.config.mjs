import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://apomonosi.github.io',
  base: '/fossexplorer'
});
