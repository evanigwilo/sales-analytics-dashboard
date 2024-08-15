// Vite Configuration
import { defineConfig } from "vite"; // Core Vite configuration function

// Plugins
import react from "@vitejs/plugin-react"; // Vite plugin for React
import tsconfigPaths from "vite-tsconfig-paths"; // Vite plugin for TypeScript path aliases

// Define the port from environment variables or default to 3000
const port = Number(process.env.VITE_APP_PORT) || 3000;

// Export Vite configuration
export default defineConfig({
  plugins: [
    react(), // Enables React support, including JSX and Fast Refresh
    tsconfigPaths(), // Supports TypeScript path aliases configured in tsconfig.json
  ],
  server: {
    port, // Port for the development server
    // open: "/", // Automatically open the browser at the root URL
    host: true,
    watch: {
      usePolling: true, // Use polling for file watching (useful in Docker or similar environments)
    },
  },
  preview: {
    port, // Port for the production preview server
  },
});
