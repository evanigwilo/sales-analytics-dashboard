import "@testing-library/jest-dom"; // Adds custom DOM matchers to Jest's assertions
import { mockMatchMedia, mockResizeObserver } from "@/__mocks__/utils/helpers";

// Mock environment variables used in the app
jest.mock("@/utils/constants/env", () => ({
  ENVIRONMENT: "development", // Set environment to development for tests
}));

// Apply global mocks for browser APIs
mockMatchMedia(); // Mocks window.matchMedia to avoid issues with media queries in tests
mockResizeObserver(); // Mocks ResizeObserver to avoid issues with responsive components
