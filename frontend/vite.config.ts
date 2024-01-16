import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	build: {
		target: "es2018",
		outDir: path.resolve(__dirname, "../backend/app/static/app"), // specify the complete path
		rollupOptions: {
			output: {
				// Explicitly specify output paths for assets
				entryFileNames: `js/[name].js`,
				chunkFileNames: `js/[name].js`,
				assetFileNames: `css/[name].[ext]`,
			},
		},
		sourcemap: true,
	},
	server: {
		open: true,
		watch: {
			usePolling: true,
			interval: 100,
		},
	},
});