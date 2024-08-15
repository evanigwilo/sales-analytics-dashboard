// Importing gql from apollo-server-core to define GraphQL schema
import { gql } from 'apollo-server-core';

// Define the GraphQL schema using the gql template literal
export default gql`
  # Define the Product type with name and category fields
  type Product {
    name: String
    category: String
  }

  # Define the Sale type with fields for id, product, amount, date, and region
  type Sale {
    id: String
    product: Product
    amount: Int
    date: String
    region: String
  }

  # Define the Query type with getCategories
  type Query {
    # Query to fetch a list of product categories
    getCategories: [String]
  }
`;
