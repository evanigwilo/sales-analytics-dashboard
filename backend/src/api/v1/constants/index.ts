// Importing types
import { Sale } from '../types';

// Environment Variables
export const { PROTOCOL, SERVER_PORT, SERVER_HOST, NODE_ENV, API_VERSION } = process.env;

// Determine the environment
export const isProduction = NODE_ENV === 'production';
export const isDevelopment = NODE_ENV === 'development';

// Server readiness message
export const serverReadyMessage = `🚀  Server ready at ${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}${API_VERSION}`;

// In-memory databases (initialized as empty)
export const salesDatabase: Sale[] = [];
export const cacheDatabase: Record<string, Sale[]> = {};

// List of product categories
export const productCategories = [
  'Electronics',
  'Clothing',
  'Home Appliances',
  'Books',
  'Toys',
  'Furniture',
  'Sports Equipment',
  'Beauty Products',
  'Automotive',
  'Groceries',
];
