// Importing individual resolvers for sales and categories
import sale from './saleResolver';
import category from './categoryResolver';

// Merging and exporting combined resolvers
export default {
  Query: {
    // Combine Query resolvers from sale and category modules
    ...sale.Query,
    ...category.Query,
  },
};
