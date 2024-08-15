// Importing gql from apollo-server-core to define GraphQL schema
import { gql } from 'apollo-server-core';

// Define the GraphQL schema using the gql template literal
export default gql`
  # Define the Sale type with fields for id, product, amount, date, and region
  type Sale {
    id: String # Unique identifier for the sale
    product: Product # Associated product details
    amount: Int # Quantity or amount of the sale
    date: String # Date of the sale (ISO 8601 format recommended)
    region: String # Region where the sale occurred
  }

  # Define the Query type with a single query: getSales
  type Query {
    # Query to fetch sales with optional filters for date range and category
    getSales(
      startDate: String # Start date for filtering sales (ISO 8601 format recommended)
      endDate: String # End date for filtering sales (ISO 8601 format recommended)
      category: String # Optional category filter for sales
    ): [Sale] # Returns a list of Sale objects
  }
`;
