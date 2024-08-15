// Extract environment variables from import.meta.env
export const {
  VITE_APP_SERVER_API_VERSION,
  VITE_APP_SERVER_HOST,
  VITE_APP_SERVER_PATH,
  VITE_APP_SERVER_PORT,
  VITE_APP_SERVER_PROTOCOL,
  VITE_APP_PORT,
} = import.meta.env;
