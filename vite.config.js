import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@utils": "/src/bff/utils",
			"@operation": "/src/bff/operation",
			"@server": "/src/bff/server.js",
			"@app": "/src/app.jsx",
			"@components": "/src/components",
			"@actions": "/src/redux/actions",
			"@redusers": "/src/redux/redusers",
			"@store": "/src/redux/store.js",
			"@selectors": "/src/redux/selectors",
			"@pages": "/src/pages",
			"@constants": "/src/constants",
			"@hooks": "/src/hooks",
			"@helpers": "/src/helpers",
		},
	},
});
