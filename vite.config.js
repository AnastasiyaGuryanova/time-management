import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@api": "/src/bff/api",
			"@utils": "/src/bff/utils",
			"@operation": "/src/bff/operation",
			"@sessions": "/src/bff/sessions.js",
			"@server": "/src/bff/server.js",
			"@app": "/src/app.jsx",
			"@components": "/src/components",
		},
	},
});
