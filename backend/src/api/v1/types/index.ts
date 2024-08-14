/**
 * Represents a product in the system.
 */
export type Product = {
  /**
   * The name of the product.
   */
  name: string;

  /**
   * The category of the product (e.g., Electronics, Clothing).
   */
  category: string;
};

/**
 * Represents a sale transaction in the system.
 */
export type Sale = {
  /**
   * A unique identifier for the sale.
   */
  id: string;

  /**
   * Details about the product involved in the sale.
   */
  product: Product;

  /**
   * The amount of the sale (e.g., quantity sold or total sales amount).
   */
  amount: number;

  /**
   * The date when the sale occurred (ISO 8601 date format).
   */
  date: string;

  /**
   * The region where the sale occurred.
   */
  region: string;
};
