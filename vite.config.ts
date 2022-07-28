import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";
// https://vitejs.dev/config/
export default defineConfig({
    base: `./`,
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: "http://127.0.0.1:3001",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    resolve: {
        alias: {
            "@": resolve(__dirname,"src/")
        }
    },
    plugins: [vue()]
})
