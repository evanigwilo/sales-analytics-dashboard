import { OperationVariables } from "@apollo/client";
import { gqlQueries } from "@/utils/constants";
import { GraphQLError } from "graphql";
import { Sale } from "@/utils/types";
import { screen } from "@testing-library/react"; // Import testing utilities
import { secsToMs } from "@/utils/helpers"; // Utility to convert seconds to milliseconds
import { act } from "react";

// Mock GraphQL queries for testing
export const mockQueries = {
  // Mock query for getting sales data
  getSales: (
    sales: Sale[],
    error: boolean = false,
    variables: OperationVariables = {
      category: "",
      startDate: null,
      endDate: null,
    }
  ) => ({
    request: {
      query: gqlQueries.getSales,
      variables,
    },
    result: {
      data: {
        getSales: sales,
      },
    },
    error: error ? new GraphQLError("Failed to fetch") : undefined,
  }),

  // Mock query for getting categories data
  getCategories: (error: boolean = false) => ({
    request: {
      query: gqlQueries.getCategories,
      variables: {},
    },
    result: {
      data: {
        getCategories: [
          "Electronics",
          "Clothing",
          "Home Appliances",
          "Books",
          "Toys",
          "Furniture",
          "Sports Equipment",
          "Beauty Products",
          "Automotive",
          "Groceries",
        ],
      },
    },
    error: error ? new GraphQLError("Failed to fetch") : undefined,
  }),
};

// Mock implementation for matchMedia
export const mockMatchMedia = () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false, // Set default match status
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated, but sometimes used
    removeListener: jest.fn(), // Deprecated, but sometimes used
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
};

// Mock implementation for ResizeObserver
export const mockResizeObserver = () => {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  global.ResizeObserver = ResizeObserver;
};

// Helper to find text content by tag and text
export const findTextContent =
  (text: string, tag = "span") =>
  (_content: string, element: Element | null) =>
    element?.tagName.toLowerCase() === tag && element.textContent === text;

// Helper to find an element by class and tag
export const findByClass =
  (contains: string, tag = "div") =>
  (_content: string, element: Element | null) =>
    element?.tagName.toLowerCase() === tag &&
    element.classList.contains(contains);

// Validate initial loading spinner state
export const validateInitialLoading = async () => {
  let loadingSpinner = screen.queryByText(findByClass("loading-ui"));
  expect(loadingSpinner).toBeVisible();

  await act(async () => jest.advanceTimersByTime(secsToMs(3)));
  loadingSpinner = screen.queryByText(findByClass("loading-ui"));
  expect(loadingSpinner).toBeNull();
};

// Helper function to validate the sales table's state
export const validateSalesTable = async (
  hasItems: boolean,
  fetchError: boolean = false
) => {
  await validateInitialLoading();

  let salesTable = screen.getByTestId("sales-table");
  expect(salesTable).toHaveClass("hide");

  await act(async () => jest.advanceTimersByTime(secsToMs(0.5)));
  salesTable = screen.getByTestId("sales-table");
  expect(salesTable).toHaveClass("show");

  let salesItems = screen.queryAllByTestId(/^sales-item-/);
  expect(salesItems.length).toBe(0); // Initial state should be empty

  await act(async () => jest.advanceTimersByTime(secsToMs(0.5)));
  salesItems = screen.queryAllByTestId(/^sales-item-/);

  if (hasItems) {
    expect(salesItems.length).toBeGreaterThan(0); // Items should be displayed
  } else {
    expect(salesItems.length).toBe(0); // No items should be present
    const noSalesMessage = screen.getByText(
      findTextContent("No Sales.", "small")
    );
    expect(noSalesMessage).toBeVisible();
  }

  const errorMessage = screen.queryByText(findTextContent("Failed to fetch"));
  if (fetchError) {
    expect(errorMessage).toBeVisible();
  } else {
    expect(errorMessage).toBeNull();
  }
};

// Helper function to validate the filter component's rendering and state
export const validateFilterComponent = async () => {
  await validateInitialLoading();

  let filterBy = screen.getByTestId("filter-by");
  expect(filterBy).toHaveClass("hide");

  await act(async () => jest.advanceTimersByTime(secsToMs(0.5)));
  filterBy = screen.getByTestId("filter-by");
  expect(filterBy).toHaveClass("show");

  ["icon-filter", "icon-calender", "icon-refresh"].forEach((iconId) => {
    const iconElement = screen.getByTestId(iconId);
    expect(iconElement).toBeVisible();
  });

  ["Start Date", "End Date"].forEach((placeholder) => {
    const dateElement = screen.getByPlaceholderText(placeholder);
    expect(dateElement).toBeVisible();
    expect(dateElement).toHaveValue("");
  });

  let categorySelector = screen.queryByTestId("category-dropdown");
  expect(categorySelector).toBeNull();

  await act(async () => jest.advanceTimersByTime(secsToMs(0.5)));
  categorySelector = screen.queryByTestId("category-dropdown");
  expect(categorySelector).toBeVisible();
  expect(categorySelector).toHaveValue("All");
};
