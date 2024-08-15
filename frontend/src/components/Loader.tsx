import "@/styles/loader.css"; // Import styles for the spinner

/**
 * Spinner component renders a loading spinner with 12 rotating div elements.
 * @returns {JSX.Element} A spinner element to indicate loading state.
 */
export const Spinner = () => {
  // Create an array with 12 elements to generate the spinner divs
  const spinnerElements = Array.from({ length: 12 });

  return (
    <div className="load-spinner">
      {spinnerElements.map((_, index) => (
        <div key={index} className="spinner-element" />
      ))}
    </div>
  );
};
