// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Providers
import ApolloProvider from "@/providers/apollo";
import ContextProvider from "@/providers/context";

// Pages
import Home from "@/pages/Home";

// Global Styles
import "@/styles/global.css";

// Get the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Create and render the React application
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ApolloProvider>
      <ContextProvider>
        <Home />
      </ContextProvider>
    </ApolloProvider>
  </StrictMode>
);
