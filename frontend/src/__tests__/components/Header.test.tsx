import {
  cleanup,
  render,
  waitFor,
  screen,
  fireEvent,
} from "@testing-library/react"; // Importing necessary testing utilities
import MockProvider from "@/__mocks__/components/MockProvider"; // Mock provider for context and Apollo
import Header from "@/components/Header"; // Component under test
import { findTextContent } from "@/__mocks__/utils/helpers"; // Utility function to find text content

describe("Header Component", () => {
  const headerSelections = [
    "Dashboard",
    "Saving Plan",
    "Credit Cards",
    "Settings",
  ];

  // Utility function to verify selected element style
  const checkSelectedElement = (selectedIndex: number) => {
    const selectedStyle = { color: "white" };

    headerSelections.forEach((selection, index) => {
      const element = screen.getByText(findTextContent(selection));
      expect(element).toBeVisible();
      if (selectedIndex === index) {
        expect(element).toHaveStyle(selectedStyle);
      } else {
        expect(element).not.toHaveStyle(selectedStyle);
      }
    });
  };

  // Cleanup after each test to ensure no side effects
  afterEach(() => {
    cleanup();
  });

  it("should render the header and display initial elements correctly", async () => {
    render(
      <MockProvider>
        <Header />
      </MockProvider>
    );

    // Wait for asynchronous updates and check initial UI state
    await waitFor(() => {
      const salesTitle = screen.getByText(findTextContent("Sales"));
      expect(salesTitle).toBeVisible();
      const profileIcon = screen.getByTestId("icon-person");
      expect(profileIcon).toBeVisible();
    });

    // Verify initial selection and simulate user interaction
    checkSelectedElement(0);
    const secondElement = screen.getByText(
      findTextContent(headerSelections[1])
    );
    fireEvent.click(secondElement);

    checkSelectedElement(1);
  });

  it("should change header menu selection on click", async () => {
    render(
      <MockProvider>
        <Header />
      </MockProvider>
    );

    // Verify initial selection
    checkSelectedElement(0);
    const secondElement = screen.getByText(
      findTextContent(headerSelections[1])
    );
    fireEvent.click(secondElement);

    // Verify selection after interaction
    checkSelectedElement(1);
  });
});
