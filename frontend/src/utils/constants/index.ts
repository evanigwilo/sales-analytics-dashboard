// Import required modules from Apollo Client
import { gql } from "@apollo/client";
import {
  VITE_APP_SERVER_PROTOCOL,
  VITE_APP_SERVER_HOST,
  VITE_APP_SERVER_PORT,
  VITE_APP_SERVER_PATH,
  VITE_APP_SERVER_API_VERSION,
} from "@/utils/constants/env";

// Define constants
export const title = "Sales";

// Construct the API URL using environment variables
export const apiUrl = `${VITE_APP_SERVER_PROTOCOL}://${VITE_APP_SERVER_HOST}:${VITE_APP_SERVER_PORT}${VITE_APP_SERVER_PATH}${VITE_APP_SERVER_API_VERSION}`;

// Define GraphQL queries
export const gqlQueries = {
  getSales: gql`
    query getSales($category: String, $startDate: String, $endDate: String) {
      getSales(category: $category, startDate: $startDate, endDate: $endDate) {
        amount
        date
        id
        product {
          category
          name
        }
        region
      }
    }
  `,
  getCategories: gql`
    query getCategories {
      getCategories
    }
  `,
};
