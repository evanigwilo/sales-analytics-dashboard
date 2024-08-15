import { MockedProvider } from "@apollo/client/testing";
import { ComponentProps } from "react";

// Define a type alias for a list of mocked responses, or undefined
export type Mocks = ComponentProps<typeof MockedProvider>["mocks"];
