// Importing core Node.js modules
import { request } from 'http';

// Importing environment configuration management
import { config } from 'dotenv-safe';

// Load environment variables from .env files
config();

// Define options for the HTTP request
const requestOptions = {
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 80, // Default to port 80 if not provided
  path: `${process.env.API_VERSION}/status`,
  timeout: 2000, // 2 seconds timeout for the request
  method: 'GET',
};

// Function to handle the response from the health check
const handleResponse = (res) => {
  console.log(`STATUS: ${res.statusCode}`);

  // Exit with code 0 if the status is 200 (OK), otherwise exit with code 1
  process.exit(res.statusCode === 200 ? 0 : 1);
};

// Function to handle errors from the request
const handleError = (error) => {
  console.error('ERROR:', error.message);
  process.exit(1);
};

// Perform the health check request
const healthCheckRequest = request(requestOptions, handleResponse);
healthCheckRequest.on('error', handleError);
healthCheckRequest.end();
