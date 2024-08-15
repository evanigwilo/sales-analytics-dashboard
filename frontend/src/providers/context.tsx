// React imports
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Utility imports
import { ActionType } from "@/utils/types/enum";
import { Action, DispatchCreator, Sale, Store } from "@/utils/types";

// Initial state for the store
const initialState: Store = {
  sales: [],
  categories: [],
  transition: "hide",
  loading: {
    ui: true,
    sales: true,
    categories: true,
  },
  error: {
    sales: "",
    categories: "",
  },
  filter: {
    category: "",
    startDate: null,
    endDate: null,
  },
};

// Create context for the store and dispatch
const StoreContext = createContext<Store>(initialState);
const DispatchContext = createContext<DispatchCreator>(() => undefined);

// Reducer function to handle state changes
const reducer = (state: Store, action: Action): Store => {
  switch (action.type) {
    case ActionType.SALES:
      return { ...state, sales: action.payload as Sale[] };

    case ActionType.CATEGORIES:
      return { ...state, categories: action.payload as string[] };

    case ActionType.LOADING_UI:
      return {
        ...state,
        loading: { ...state.loading, ui: action.payload as boolean },
      };

    case ActionType.LOADING_SALES:
      return {
        ...state,
        loading: { ...state.loading, sales: action.payload as boolean },
      };

    case ActionType.LOADING_CATEGORIES:
      return {
        ...state,
        loading: { ...state.loading, categories: action.payload as boolean },
      };

    case ActionType.FILTER:
      return {
        ...state,
        filter: { ...state.filter, ...(action.payload as Store["filter"]) },
      };

    case ActionType.ERROR_CATEGORIES:
      return {
        ...state,
        error: { ...state.error, categories: action.payload as string },
      };

    case ActionType.ERROR_SALES:
      return {
        ...state,
        error: { ...state.error, sales: action.payload as string },
      }; // Fixed payload assignment

    case ActionType.TRANSITION:
      return { ...state, transition: "show" };

    default:
      return state;
  }
};

// Provider component to wrap the application and provide state and dispatch
const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchCallback: DispatchCreator = (
    type: ActionType,
    payload?: unknown
  ) => dispatch({ type, payload });

  return (
    <DispatchContext.Provider value={dispatchCallback}>
      <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
    </DispatchContext.Provider>
  );
};

export default StoreProvider;

// Custom hooks to use store and dispatch contexts
export const useStore = () => useContext(StoreContext);
export const useDispatch = () => useContext(DispatchContext);
