import { cleanup, render, screen } from "@testing-library/react"; // Import testing utilities
import MockProvider from "@/__mocks__/components/MockProvider"; // Mock provider for context and Apollo
import { mockQueries, validateInitialLoading } from "@/__mocks__/utils/helpers"; // Utility functions
import Home from "@/pages/Home"; // Component under test
import { mockSales } from "@/__mocks__/utils/constants";

describe("Home Page", () => {
  // Setup fake timers before each test
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Cleanup after each test to avoid side effects
  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  it("should render all components", async () => {
    render(
      <MockProvider
        mocks={[mockQueries.getCategories(), mockQueries.getSales(mockSales)]}
      >
        <Home />
      </MockProvider>
    );

    await validateInitialLoading();

    const salesTable = screen.getByTestId("sales-table");
    expect(salesTable).toBeInTheDocument();

    const filterBy = screen.getByTestId("filter-by");
    expect(filterBy).toBeInTheDocument();

    const lineGraph = screen.getByTestId("line-graph");
    expect(lineGraph).toBeInTheDocument();
    const barGraph = screen.getByTestId("bar-graph");
    expect(barGraph).toBeInTheDocument();
    const pieGraph = screen.getByTestId("pie-graph");
    expect(pieGraph).toBeInTheDocument();
  });
});
