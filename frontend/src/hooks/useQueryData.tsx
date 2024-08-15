// Apollo Client
import { OperationVariables, useQuery, QueryResult } from "@apollo/client";

// Constants
import { gqlQueries } from "@/utils/constants";

// Types
import { GqlQuery } from "@/utils/types";

// Helpers
import { apolloErrorMessage } from "@/utils/helpers";

// Custom hook for querying data
export const useQueryData = <T,>(
  query: GqlQuery,
  variables?: OperationVariables
) => {
  // Execute the query
  const { data, error, loading, refetch }: QueryResult<Record<string, T>> =
    useQuery<Record<string, T>>(gqlQueries[query], {
      fetchPolicy: "network-only", // Fetch data from the server on initial load
      nextFetchPolicy: "cache-first", // Use cache on subsequent queries
      errorPolicy: "all", // Handle all errors
      refetchWritePolicy: "overwrite", // Overwrite cache with new data on refetch
      notifyOnNetworkStatusChange: true, // Notify about network status changes
      variables,
    });

  // Extract the result from the data object
  const resultData = data?.[query];

  return {
    query,
    error: error ? apolloErrorMessage(error, query).message : undefined,
    refetch,
    loading,
    variables,
    data: resultData,
  };
};
