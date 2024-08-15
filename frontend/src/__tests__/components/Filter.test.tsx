import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  screen,
} from "@testing-library/react"; // Import testing utilities
import MockProvider from "@/__mocks__/components/MockProvider"; // Mock provider for context and Apollo
import {
  mockQueries,
  validateFilterComponent,
} from "@/__mocks__/utils/helpers"; // Utility functions for mocks and validation
import Home from "@/pages/Home"; // Component under test
import * as helpers from "@/utils/helpers"; // Import helper functions for testing

describe("Filtering Component", () => {
  // Setup fake timers before each test
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Cleanup after each test to avoid side effects
  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  // Test case: Render filter component correctly
  it("should render filter component", async () => {
    // Render the Home component wrapped in MockProvider with appropriate mocks
    render(
      <MockProvider
        mocks={[mockQueries.getCategories(), mockQueries.getSales([])]}
      >
        <Home />
      </MockProvider>
    );

    // Validate the rendering of the filter component
    await validateFilterComponent();
  });

  // Test case: Refresh data functionality
  it("should refresh data", async () => {
    // Render the Home component with mocks for sales and categories
    render(
      <MockProvider
        mocks={[
          mockQueries.getSales([]), // First query to be used in initial load
          mockQueries.getSales([]), // Second query to be used in refresh
          mockQueries.getCategories(), // Categories query for initial load
          mockQueries.getCategories(), // Duplicate categories query for refresh
        ]}
      >
        <Home />
      </MockProvider>
    );

    // Validate the filter component is rendered correctly
    await validateFilterComponent();

    // Spy on the `splitIntoBatches` function and clear previous calls
    const spySplitIntoBatches = jest.spyOn(helpers, "splitIntoBatches");
    spySplitIntoBatches.mockClear();

    // Ensure `splitIntoBatches` calls has been reset
    expect(spySplitIntoBatches).toHaveBeenCalledTimes(0);

    // Get the refresh icon and ensure it is visible
    const iconRefresh = screen.getByTestId("icon-refresh");
    expect(iconRefresh).toBeVisible();

    // Simulate a click on the refresh icon
    fireEvent.click(iconRefresh);

    // Wait for the expected behavior after clicking refresh
    await waitFor(() => {
      // Validate that `splitIntoBatches` has been called once or twice
      const calls = spySplitIntoBatches.mock.calls.length;
      expect(calls === 1 || calls === 2).toBeTruthy();
    });
  });
});
