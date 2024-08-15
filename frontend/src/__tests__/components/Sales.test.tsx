import { cleanup, render } from "@testing-library/react"; // Import testing utilities
import MockProvider from "@/__mocks__/components/MockProvider"; // Mock provider for context and Apollo
import { mockQueries, validateSalesTable } from "@/__mocks__/utils/helpers"; // Utility functions
import Home from "@/pages/Home"; // Component under test
import { mockSales } from "@/__mocks__/utils/constants"; // Mock data for sales

describe("Sales Table Component", () => {
  // Setup fake timers before each test
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Cleanup after each test to avoid side effects
  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  // Test case: Render sales table with no items
  it("should render sales table with no items", async () => {
    render(
      <MockProvider
        mocks={[mockQueries.getCategories(), mockQueries.getSales([])]}
      >
        <Home />
      </MockProvider>
    );
    await validateSalesTable(false);
  });

  // Test case: Render sales table with some items
  it("should render sales table with some items", async () => {
    render(
      <MockProvider
        mocks={[mockQueries.getCategories(), mockQueries.getSales(mockSales)]}
      >
        <Home />
      </MockProvider>
    );
    await validateSalesTable(true);
  });

  // Test case: Render sales table with fetch error
  it("should render sales table with fetch error", async () => {
    render(
      <MockProvider
        mocks={[
          mockQueries.getCategories(),
          mockQueries.getSales([], true),
          mockQueries.getSales([], true, {}),
        ]}
      >
        <Home />
      </MockProvider>
    );
    await validateSalesTable(false, true);
  });
});
