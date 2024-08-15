// Importing types and utilities
import { IResolvers } from '@graphql-tools/utils';
import { getSalesByDateAndCategory } from '../../helpers';
import { cacheDatabase } from '../../constants';

// Define resolvers for GraphQL queries
const resolvers: IResolvers = {
  Query: {
    // Resolver for the `getSales` query
    getSales: (_, args) => {
      const { startDate, endDate, category } = args;
      const cacheKey = `${startDate}-${endDate}-${category || ''}`;

      // Check if the sales data for the given query parameters is already cached
      if (cacheDatabase[cacheKey]) {
        return cacheDatabase[cacheKey];
      }

      // Fetch sales data if not cached and store it in cache
      const salesData = getSalesByDateAndCategory(startDate, endDate, category);
      cacheDatabase[cacheKey] = salesData;
      return salesData;
    },
  },
};

// Export the resolvers for use in the GraphQL schema
export default resolvers;
