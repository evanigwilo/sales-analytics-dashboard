import { MockedProvider } from "@apollo/client/testing"; // Provides a mocked Apollo Client for testing
import { ReactNode } from "react"; // Type definition for React nodes
import { cache } from "@/providers/apollo"; // Apollo Client cache instance
import ContextProvider from "@/providers/context"; // Custom context provider for your app
import { Mocks } from "@/__mocks__/utils/types";

interface Props {
  children: ReactNode; // React nodes to be rendered inside the provider
  mocks?: Mocks; // Optional Apollo mocks for testing
}

/**
 * A wrapper component to provide Apollo Client and custom context for testing.
 *
 * @param {ReactNode} children - React elements to be rendered within the providers.
 * @param {Array} [mocks] - Optional array of Apollo Client mocks.
 * @returns {JSX.Element} The wrapped component with providers.
 */
const TestProvider: React.FC<Props> = ({ children, mocks }) => (
  <MockedProvider mocks={mocks} cache={cache}>
    <ContextProvider>{children}</ContextProvider>
  </MockedProvider>
);

export default TestProvider;
