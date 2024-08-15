// Import necessary modules and types
import { gqlQueries } from "@/utils/constants";
import { ActionType } from "@/utils/types/enum";
import { DateTime } from "luxon";

/**
 * Represents a product with its name and category.
 */
export type Product = {
  name: string; // The name of the product
  category: string; // The category the product belongs to
};

/**
 * Represents a sale record including product details, amount, date, and region.
 */
export type Sale = {
  id: string; // Unique identifier for the sale
  product: Product; // The product that was sold
  amount: number; // Amount of the sale
  date: string; // Date of the sale in ISO string format
  region: string; // Region where the sale occurred
};

/**
 * Represents the structure of the application state store.
 */
export type Store = {
  sales: Sale[]; // Array of sales records
  categories: string[]; // List of product categories
  transition: "show" | "hide"; // UI transition state
  filter: {
    category: string; // Filter by product category
    startDate: DateTime | null; // Start date for filtering sales
    endDate: DateTime | null; // End date for filtering sales
  };
  loading: {
    ui: boolean; // Loading state for initial render of UI elements
    sales: boolean; // Loading state for sales data
    categories: boolean; // Loading state for categories data
  };
  error: {
    sales: string; // Error message related to sales data
    categories: string; // Error message related to categories data
  };
};

/**
 * Represents an action that can be dispatched to the reducer.
 */
export type Action = {
  type: ActionType; // Type of action being dispatched
  payload: unknown; // Data associated with the action
};

/**
 * Function type for dispatching actions in the context.
 * @param type - The type of action to dispatch.
 * @param payload - Optional data to be sent with the action.
 */
export type DispatchCreator = (type: ActionType, payload?: unknown) => void;

/**
 * Type representing a GraphQL query from the predefined gqlQueries.
 */
export type GqlQuery = keyof typeof gqlQueries;
