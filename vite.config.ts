import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            "/api" : "http://localhost:9000"
        }
    },
	plugins: [sveltekit()]
});
