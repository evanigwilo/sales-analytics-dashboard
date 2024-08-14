// Importing necessary libraries and modules
import { DateTime } from 'luxon';
import { productCategories, salesDatabase } from '../constants';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

/**
 * Generates random sales data for the past N months.
 *
 * @param months - The number of months for which to generate data. Defaults to 3 months.
 */
export const generateLastNSalesData = (months: number = 3) => {
  // Get the current date and time
  const today = DateTime.now();

  // Calculate the start date for N months ago
  const lastMonthStart = today.minus({ months }).startOf('month');

  // Iterate through each day in the specified period
  for (let date = lastMonthStart; date <= today; date = date.plus({ days: 1 })) {
    // Generate a random number of sales entries for each day (0 to 10 entries)
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
      salesDatabase.push({
        id: randomUUID(), // Unique identifier for the sale
        product: {
          name: faker.commerce.productName(), // Random product name
          category: getRandomCategory(), // Random product category
        },
        amount: faker.datatype.number({ min: 100, max: 1000 }), // Random sales amount between 100 and 1000
        date: date.toISODate()!, // ISO format date string
        region: faker.address.country(), // Random sales region
      });
    }
  }
};

/**
 * Filters sales data based on a date range and an optional product category.
 *
 * @param startDate - The start date for filtering (string, number, or Date).
 * @param endDate - The end date for filtering (string, number, or Date).
 * @param category - The category of the product to filter by.
 * @returns An array of sales objects that match the specified criteria.
 */
export const getSalesByDateAndCategory = (
  startDate: string | number | Date,
  endDate: string | number | Date,
  category?: string, // Make category optional
): Array<{ id: string; product: { name: string; category: string }; amount: number; date: string; region: string }> => {
  // Convert startDate and endDate to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  return salesDatabase.filter((sale) => {
    // Convert sale date to Date object
    const saleDate = new Date(sale.date);

    // Check if the sale date is within the specified date range
    const isAfterStartDate = !startDate || saleDate >= start;
    const isBeforeEndDate = !endDate || saleDate <= end;
    const isWithinDateRange = isAfterStartDate && isBeforeEndDate;

    // Check if the sale category matches the specified category
    const doesCategoryMatch = !category || sale.product.category.toLowerCase() === category.toLowerCase();

    // Return true if both date range and category match
    return isWithinDateRange && doesCategoryMatch;
  });
};

/**
 * Returns a random product category from the predefined list.
 *
 * @returns A random product category.
 */
export const getRandomCategory = (): string => {
  // Generate a random index between 0 and the length of the productCategories array - 1
  const randomIndex = Math.floor(Math.random() * productCategories.length);
  // Return the category at the random index
  return productCategories[randomIndex];
};
