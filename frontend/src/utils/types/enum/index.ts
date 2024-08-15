/**
 * Enum representing the possible states of selection in the application.
 */
export enum SelectionState {
  EXPAND = "EXPAND", // State when the selection is expanded
  SCALE = "SCALE", // State when the selection is scaled
}

/**
 * Enum representing various action types for state management.
 */
export enum ActionType {
  LOADING_UI = "LOADING_UI", // Action type for UI loading state
  LOADING_SALES = "LOADING_SALES", // Action type for sales loading state
  LOADING_CATEGORIES = "LOADING_CATEGORIES", // Action type for categories loading state
  ERROR_UI = "ERROR_UI", // Action type for UI error state
  ERROR_SALES = "ERROR_SALES", // Action type for sales error state
  ERROR_CATEGORIES = "ERROR_CATEGORIES", // Action type for categories error state
  SALES = "SALES", // Action type for setting sales data
  CATEGORIES = "CATEGORIES", // Action type for setting categories data
  TRANSITION = "TRANSITION", // Action type for handling transitions
  FILTER = "FILTER", // Action type for applying filters
}
