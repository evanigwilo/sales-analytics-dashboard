// Import and configure dotenv to load environment variables from .env
import dotenv from 'dotenv-safe';
dotenv.config({ allowEmptyValues: true });

// Constants, Helpers & Types
import { startApolloServer } from './graphql';
import { generateLastNSalesData } from './helpers';

// Generate initial sales data
// Adjust the number of months as needed, or set it dynamically if required
generateLastNSalesData();

// Start Apollo Server
startApolloServer().catch((error) => {
  // Log the error and exit the process with a failure code
  console.error('Failed to start the Apollo server:', error);
  process.exit(1);
});
