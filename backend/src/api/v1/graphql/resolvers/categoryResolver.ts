// Importing necessary types from graphql-tools
import { IResolvers } from '@graphql-tools/utils';

// Importing constants
import { productCategories } from '../../constants';

// Define the GraphQL resolvers
const resolvers: IResolvers = {
  Query: {
    // Resolver function for the `getCategories` query
    getCategories: () => {
      // Return the list of product categories from constants
      return productCategories;
    },
  },
};

// Export the resolvers object for use in the GraphQL schema
export default resolvers;
