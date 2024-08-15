// React library imports
import React, { ReactNode } from "react";

// Apollo Client imports
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

// Utility imports
import { apiUrl } from "@/utils/constants";

// Create a single instance of InMemoryCache and export it for testing
export const cache = new InMemoryCache();

// Function to create an instance of Apollo Client
const createApolloClient = (): ApolloClient<object> => {
  return new ApolloClient({
    uri: apiUrl,
    cache,
  });
};

// Provider component to supply Apollo Client context to React tree
const ApolloClientProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Create an Apollo Client instance with memoization to optimize performance
  const client = React.useMemo(() => createApolloClient(), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
